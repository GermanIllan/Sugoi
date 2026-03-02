import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useForumStore } from '@/stores/forum';

describe('ForumStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        // Mock global fetch
        globalThis.fetch = vi.fn();
    });

    it('should add a new topic to the store', async () => {
        const forumStore = useForumStore();
        const mockTopic = {
            id: 'new-topic-id',
            title: 'Test Topic',
            author: 'TestAuthor',
            content: 'Test content',
            createdAt: new Date().toISOString()
        };

        (globalThis.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => mockTopic
        });

        const result = await forumStore.createTopic({
            title: 'Test Topic',
            author: 'TestAuthor',
            content: 'Test content'
        });

        expect(result).toEqual(mockTopic);
        expect(forumStore.topics).toContainEqual(mockTopic);
        expect(globalThis.fetch).toHaveBeenCalledWith('http://localhost:5174/topics', expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('Test Topic')
        }));
    });

    it('should add a reply to a topic', async () => {
        const forumStore = useForumStore();
        const mockReply = {
            id: 'new-reply-id',
            topicId: '1',
            author: 'ReplyAuthor',
            content: 'Test reply',
            createdAt: new Date().toISOString()
        };

        (globalThis.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => mockReply
        });

        await forumStore.addReply({
            topicId: '1',
            author: 'ReplyAuthor',
            content: 'Test reply'
        });

        expect(forumStore.replies).toContainEqual(mockReply);
        expect(globalThis.fetch).toHaveBeenCalledWith('http://localhost:5174/replies', expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('Test reply')
        }));
    });
});
