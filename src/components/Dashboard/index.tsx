"use client";

import useAuth from '@/app/hooks/userAuth';
import { database, storage } from '@/app/utils/firebase';
import { ref as dbRef, onValue, orderByChild, push, query, set } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import DashboardHeader from '../DashboardHeader';
import GradientButton from '../GradientButton';

// Define message types
interface Message {
    id: string;
    text: string;
    timestamp: number;
    userId: string;
    type: 'prompt' | 'image';
    imageUrl?: string;
    conversationId?: string;
}

const Dashboard: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
    const { user, loading: authLoading } = useAuth();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Create a new conversation
    const createNewConversation = () => {
        // Generate a unique ID for the conversation
        const newConversationId = Date.now().toString();
        setCurrentConversationId(newConversationId);
        return newConversationId;
    };

    // Get filtered messages for the current conversation
    const getCurrentConversationMessages = (): Message[] => {
        if (!currentConversationId) return [];
        return messages.filter(message => message.conversationId === currentConversationId);
    };

    // Load messages from Firebase
    useEffect(() => {
        if (!user) return;

        const messagesRef = query(dbRef(database, `userMessages/${user.uid}`), orderByChild('timestamp'));

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const messagesData: Message[] = [];
            snapshot.forEach((childSnapshot) => {
                const message = {
                    id: childSnapshot.key as string,
                    ...childSnapshot.val()
                };
                messagesData.push(message);
            });

            // Sort messages by timestamp
            messagesData.sort((a, b) => a.timestamp - b.timestamp);
            setMessages(messagesData);

            // If no current conversation is set and we have messages, set it to the latest conversation
            if (!currentConversationId && messagesData.length > 0) {
                const latestMessage = messagesData[messagesData.length - 1];
                if (latestMessage.conversationId) {
                    setCurrentConversationId(latestMessage.conversationId);
                } else {
                    // If no conversation ID exists, create a new one
                    createNewConversation();
                }
            }

            // Scroll to bottom when new messages are loaded
            setTimeout(scrollToBottom, 100);
        });

        return () => unsubscribe();
    }, [user, currentConversationId]);

    // Scroll to bottom when messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Function to upload image to Firebase Storage
    const uploadImageToStorage = async (blob: Blob): Promise<string> => {
        if (!user) throw new Error("User not authenticated");

        // Create a unique filename with user ID for better organization and security
        const filename = `images/${user.uid}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpg`;
        const imageRef = storageRef(storage, filename);

        // Upload the blob
        await uploadBytes(imageRef, blob);

        // Get the download URL
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
    };

    // Handle sending a prompt
    const handleSendPrompt = async () => {
        if (!prompt.trim() || !user) return;

        setIsLoading(true);

        try {
            // Ensure we have a conversation ID
            const conversationId = currentConversationId || createNewConversation();

            // Save prompt message to Firebase under user-specific path
            const messageRef = dbRef(database, `userMessages/${user.uid}`);
            const newMessageRef = push(messageRef);
            const messageData = {
                text: prompt,
                timestamp: Date.now(),
                userId: user.uid,
                type: 'prompt',
                conversationId
            };

            await set(newMessageRef, messageData);

            // Generate image
            const response = await fetch(`/api/proxy?prompt=${encodeURIComponent(prompt)}`);

            if (response.ok) {
                // Convert the response to a blob
                const imageBlob = await response.blob();

                // Upload the image to Firebase Storage in user's folder
                const imageUrl = await uploadImageToStorage(imageBlob);

                // Save image message to Firebase
                const imageMessageRef = push(messageRef);
                const imageMessageData = {
                    text: '',
                    timestamp: Date.now(),
                    userId: 'system',
                    type: 'image',
                    imageUrl: imageUrl,
                    conversationId
                };

                await set(imageMessageRef, imageMessageData);
            } else {
                console.error('Failed to generate image:', await response.text());
            }

            // Clear prompt
            setPrompt('');
        } catch (error) {
            console.error('Error sending prompt:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle pressing Enter to send message
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendPrompt();
        }
    };

    // If still loading auth, show loading state
    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-cosmic-dark">
                <div className="text-cosmic-purple">Loading...</div>
            </div>
        );
    }

    // If no user is logged in, show login message
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-cosmic-dark p-4">
                <h2 className="text-2xl font-bold text-white mb-4">Please sign in to use the AI Image Generator</h2>
                <p className="text-gray-300 mb-8 text-center">You need to be logged in to generate images and save your chat history.</p>
            </div>
        );
    }

    // Get current conversation messages
    const currentMessages = getCurrentConversationMessages();

    return (
        <div className="flex flex-col h-screen bg-cosmic-dark">
            <DashboardHeader />

            {/* Chat container */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 md:px-8 py-6 scrollbar-none"
            >
                <div className="max-w-4xl mx-auto">
                    {currentMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <h2 className="text-2xl font-bold text-white mb-4">AI Image Generator</h2>
                            <p className="text-gray-300 mb-8">
                                Enter a prompt below to generate an image using AI. Your conversation history will be saved.
                            </p>
                        </div>
                    ) : (
                        currentMessages.map((message) => (
                            <div
                                key={message.id}
                                className={`my-4 ${message.userId === user.uid ? 'flex justify-end' : 'flex justify-start'}`}
                            >
                                <div className={`max-w-[80%] ${message.type === 'prompt' ? 'inline-block' : 'w-full'}`}>
                                    {message.type === 'prompt' ? (
                                        <div className={`rounded-lg py-3 px-4 ${message.userId === user.uid
                                            ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white'
                                            : 'bg-cosmic-deep border border-white/10 text-white'
                                            }`}>
                                            {message.text}
                                        </div>
                                    ) : (
                                        <div className="glass-card rounded-lg overflow-hidden">
                                            {message.imageUrl && (
                                                <div className="relative w-full" style={{ marginBottom: '-42px' }}>
                                                    <Image
                                                        src={message.imageUrl}
                                                        alt="AI generated image"
                                                        width={700}
                                                        height={700}
                                                        className="object-contain w-full h-auto rounded-lg"
                                                        style={{ clipPath: 'inset(0 0 42px 0)' }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="my-4 mr-auto max-w-[80%]">
                            <div className="glass-card rounded-lg p-6 flex flex-col items-center justify-center">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="h-12 w-12 bg-cosmic-purple/30 rounded-full animate-pulse-glow"></div>
                                </div>
                                <p className="text-white text-sm mt-3">Generating image...</p>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input area */}
            <div className="border-t border-white/10 bg-cosmic-deep px-4 md:px-8 py-3">
                <div className="max-w-4xl mx-auto flex items-end gap-2">
                    <div className="flex-1">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your prompt here..."
                            className="w-full bg-cosmic-dark border border-white/10 rounded-lg p-3 text-white resize-none focus:ring-1 focus:ring-cosmic-purple focus:border-cosmic-purple"
                            rows={1}
                            disabled={isLoading}
                        />
                    </div>
                    <GradientButton
                        onClick={handleSendPrompt}
                        isLoading={isLoading}
                        text="Generate"
                        className="px-6 mb-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
