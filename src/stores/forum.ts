import { defineStore } from 'pinia'

export interface Topic {
  id: string
  title: string
  author: string
  content: string
  createdAt: string
}

export interface Reply {
  id: string
  topicId: string
  author: string
  content: string
  createdAt: string
}

export const useForumStore = defineStore('forum', {
  state: () => ({
    topics: [] as Topic[],
    currentTopic: null as Topic | null,
    replies: [] as Reply[],
    loading: false,
  }),

  actions: {
    async fetchTopics() {
      this.loading = true
      try {
        const response = await fetch('http://localhost:5174/topics')
        this.topics = await response.json()
      } catch (error) {
        console.error('Error fetching topics:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchTopicById(id: string) {
      this.loading = true
      try {
        const response = await fetch(`http://localhost:5174/topics/${id}`)
        this.currentTopic = await response.json()
        await this.fetchReplies(id)
      } catch (error) {
        console.error('Error fetching topic:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchReplies(topicId: string) {
      try {
        const response = await fetch(`http://localhost:5174/replies?topicId=${topicId}`)
        this.replies = await response.json()
      } catch (error) {
        console.error('Error fetching replies:', error)
      }
    },

    async createTopic(topic: Omit<Topic, 'id' | 'createdAt'>) {
      const newTopic = {
        ...topic,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      }
      try {
        const response = await fetch('http://localhost:5174/topics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTopic),
        })
        const data = await response.json()
        this.topics.push(data)
        return data
      } catch (error) {
        console.error('Error creating topic:', error)
      }
    },

    async addReply(reply: Omit<Reply, 'id' | 'createdAt'>) {
      const newReply = {
        ...reply,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      }
      try {
        const response = await fetch('http://localhost:5174/replies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReply),
        })
        const data = await response.json()
        this.replies.push(data)
      } catch (error) {
        console.error('Error adding reply:', error)
      }
    },
  },
})
