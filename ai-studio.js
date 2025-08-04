// AI Studio JavaScript Functionality
class AIStudio {
    constructor() {
        this.currentTool = 'business-ai';
        this.chatMessages = [];
        this.isGenerating = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadWelcomeMessage();
        this.updateUsageStats();
        this.loadRecentProjects();
    }

    setupEventListeners() {
        // Tool selection
        document.querySelectorAll('.ai-tool-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectTool(card.dataset.tool);
            });
        });

        // Chat functionality
        const sendBtn = document.getElementById('send-message');
        const messageInput = document.getElementById('message-input');
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Quick prompts
        document.querySelectorAll('.quick-prompt').forEach(prompt => {
            prompt.addEventListener('click', (e) => {
                const messageInput = document.getElementById('message-input');
                if (messageInput) {
                    messageInput.value = e.target.textContent;
                    this.sendMessage();
                }
            });
        });

        // Workspace controls
        const newChatBtn = document.getElementById('new-chat');
        const exportBtn = document.getElementById('export-chat');
        
        if (newChatBtn) {
            newChatBtn.addEventListener('click', () => this.newChat());
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportChat());
        }
    }

    selectTool(toolName) {
        // Update active tool
        document.querySelectorAll('.ai-tool-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const selectedCard = document.querySelector(`[data-tool="${toolName}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
        }

        this.currentTool = toolName;
        this.updateWorkspaceHeader(toolName);
        this.updateQuickPrompts(toolName);
    }

    updateWorkspaceHeader(toolName) {
        const header = document.querySelector('.workspace-header h2');
        const toolNames = {
            'business-ai': 'Business AI Assistant',
            'image-gen': 'AI Image Generation',
            'video-gen': 'AI Video Generation'
        };
        
        if (header) {
            header.textContent = toolNames[toolName] || 'AI Studio';
        }
    }

    updateQuickPrompts(toolName) {
        const promptsContainer = document.querySelector('.quick-prompts');
        if (!promptsContainer) return;

        const prompts = {
            'business-ai': [
                'Create a business plan',
                'Marketing strategy',
                'Financial analysis',
                'SWOT analysis',
                'Competitor research'
            ],
            'image-gen': [
                'Professional headshot',
                'Product mockup',
                'Social media banner',
                'Logo design',
                'Marketing visual'
            ],
            'video-gen': [
                'Product demo',
                'Explainer video',
                'Social media ad',
                'Training video',
                'Company intro'
            ]
        };

        promptsContainer.innerHTML = '';
        (prompts[toolName] || []).forEach(prompt => {
            const button = document.createElement('button');
            button.className = 'quick-prompt';
            button.textContent = prompt;
            promptsContainer.appendChild(button);
        });

        // Re-attach event listeners
        document.querySelectorAll('.quick-prompt').forEach(prompt => {
            prompt.addEventListener('click', (e) => {
                const messageInput = document.getElementById('message-input');
                if (messageInput) {
                    messageInput.value = e.target.textContent;
                    this.sendMessage();
                }
            });
        });
    }

    async sendMessage() {
        const messageInput = document.getElementById('message-input');
        if (!messageInput || !messageInput.value.trim() || this.isGenerating) return;

        const userMessage = messageInput.value.trim();
        messageInput.value = '';

        // Add user message to chat
        this.addMessage('user', userMessage);

        // Show typing indicator
        this.showTypingIndicator();
        this.isGenerating = true;

        try {
            let response;
            switch (this.currentTool) {
                case 'business-ai':
                    response = await this.generateBusinessResponse(userMessage);
                    break;
                case 'image-gen':
                    response = await this.generateImage(userMessage);
                    break;
                case 'video-gen':
                    response = await this.generateVideo(userMessage);
                    break;
                default:
                    response = 'Please select a tool to get started.';
            }

            this.hideTypingIndicator();
            this.addMessage('ai', response);
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('ai', 'Sorry, I encountered an error. Please try again.');
            console.error('AI Studio Error:', error);
        } finally {
            this.isGenerating = false;
        }
    }

    async generateBusinessResponse(prompt) {
        // Enhance prompt with business context
        const businessPrompt = `As a professional business consultant and advisor, please provide a comprehensive business-focused response to the following request. Your response should be practical, actionable, and tailored for business professionals. Include specific strategies, best practices, and actionable insights where applicable.\n\nRequest: ${prompt}`;

        try {
            const response = await fetch(`${GOOGLE_AI_API_URL}?key=${GOOGLE_AI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: businessPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Business AI Error:', error);
            return 'I apologize, but I\'m having trouble generating a business response right now. Please try again later.';
        }
    }

    async generateImage(prompt) {
        try {
            // First, generate a detailed business-focused image description
            const imagePrompt = `Create a detailed, professional image description for business use based on this request: "${prompt}". The description should be suitable for AI image generation and focus on professional, business-appropriate visuals. Include details about style, composition, lighting, and business context.`;

            const descriptionResponse = await fetch(`${GOOGLE_AI_API_URL}?key=${GOOGLE_AI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: imagePrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 512
                    }
                })
            });

            if (!descriptionResponse.ok) {
                throw new Error(`Description API request failed: ${descriptionResponse.status}`);
            }

            const descriptionData = await descriptionResponse.json();
            const imageDescription = descriptionData.candidates[0].content.parts[0].text;

            // For now, we'll use a placeholder image service
            // In a real implementation, you would integrate with Google's Imagen API or similar
            const imageKeywords = this.extractKeywords(imageDescription);
            const imageUrl = `https://source.unsplash.com/800x600/?${imageKeywords.join(',')},business,professional`;

            return `I've generated an image based on your request: "${prompt}"\n\n**Image Description:**\n${imageDescription}\n\n![Generated Image](${imageUrl})\n\n*Note: This is a placeholder implementation. In production, this would use Google's Imagen API for custom image generation.*`;
        } catch (error) {
            console.error('Image Generation Error:', error);
            return 'I apologize, but I\'m having trouble generating an image right now. Please try again later.';
        }
    }

    async generateVideo(prompt) {
        try {
            // Generate a detailed video concept and script
            const videoPrompt = `Create a detailed video concept and script for business use based on this request: "${prompt}". Include:\n1. Video concept and purpose\n2. Target audience\n3. Key messages\n4. Visual style and tone\n5. Suggested duration\n6. Call-to-action\n\nMake it professional and business-appropriate.`;

            const response = await fetch(`${GOOGLE_AI_API_URL}?key=${GOOGLE_AI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: videoPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 1024
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Video API request failed: ${response.status}`);
            }

            const data = await response.json();
            const videoScript = data.candidates[0].content.parts[0].text;

            return `I've created a comprehensive video concept for your request: "${prompt}"\n\n${videoScript}\n\n*Note: This provides the video concept and script. In production, this would integrate with video generation APIs to create actual video content.*`;
        } catch (error) {
            console.error('Video Generation Error:', error);
            return 'I apologize, but I\'m having trouble generating a video concept right now. Please try again later.';
        }
    }

    extractKeywords(text) {
        const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const keywords = words.filter(word => 
            word.length > 3 && 
            !commonWords.includes(word)
        ).slice(0, 5);
        return keywords.length > 0 ? keywords : ['business', 'professional'];
    }

    addMessage(sender, content) {
        const messagesContainer = document.querySelector('.chat-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const content_div = document.createElement('div');
        content_div.className = 'message-content';
        
        // Handle markdown-like formatting
        const formattedContent = this.formatMessage(content);
        content_div.innerHTML = `<p>${formattedContent}</p>`;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content_div);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store message
        this.chatMessages.push({ sender, content, timestamp: new Date() });
    }

    formatMessage(content) {
        // Basic markdown-like formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; border-radius: 8px; margin: 10px 0;">');
    }

    showTypingIndicator() {
        const messagesContainer = document.querySelector('.chat-messages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="spinner"></div>
                <span>AI is thinking...</span>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    loadWelcomeMessage() {
        const welcomeMessage = `Welcome to Prosoft Digital Space AI Studio! 🚀\n\nI'm your business AI assistant, ready to help you with:\n\n**Business AI Assistant** - Strategic planning, market analysis, and business insights\n**Image Generation** - Professional visuals for your business needs\n**Video Generation** - Concept development and scripting for business videos\n\nSelect a tool above and let's get started!`;
        
        this.addMessage('ai', welcomeMessage);
    }

    newChat() {
        const messagesContainer = document.querySelector('.chat-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
        this.chatMessages = [];
        this.loadWelcomeMessage();
    }

    exportChat() {
        if (this.chatMessages.length === 0) {
            alert('No messages to export.');
            return;
        }

        const chatData = {
            tool: this.currentTool,
            messages: this.chatMessages,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-studio-chat-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    updateUsageStats() {
        // Simulate usage statistics
        const stats = {
            'api-calls': { value: 847, max: 1000, percentage: 84.7 },
            'tokens': { value: 125000, max: 150000, percentage: 83.3 },
            'images': { value: 23, max: 50, percentage: 46 },
            'videos': { value: 5, max: 20, percentage: 25 }
        };

        Object.keys(stats).forEach(key => {
            const valueElement = document.querySelector(`[data-stat="${key}"] .usage-value`);
            const fillElement = document.querySelector(`[data-stat="${key}"] .usage-fill`);
            
            if (valueElement && fillElement) {
                const stat = stats[key];
                valueElement.textContent = `${stat.value.toLocaleString()} / ${stat.max.toLocaleString()}`;
                fillElement.style.width = `${stat.percentage}%`;
            }
        });
    }

    loadRecentProjects() {
        const projects = [
            { name: 'Marketing Campaign', type: 'Business AI', date: '2 hours ago', icon: 'fas fa-chart-line' },
            { name: 'Product Mockups', type: 'Image Gen', date: '1 day ago', icon: 'fas fa-image' },
            { name: 'Company Intro', type: 'Video Gen', date: '3 days ago', icon: 'fas fa-video' },
            { name: 'SWOT Analysis', type: 'Business AI', date: '1 week ago', icon: 'fas fa-analytics' }
        ];

        const container = document.querySelector('.recent-projects');
        if (!container) return;

        // Clear existing content except header
        const existingItems = container.querySelectorAll('.project-item');
        existingItems.forEach(item => item.remove());

        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-item';
            projectDiv.innerHTML = `
                <div class="project-icon">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-info">
                    <h4>${project.name}</h4>
                    <p>${project.type} • ${project.date}</p>
                </div>
            `;
            container.appendChild(projectDiv);
        });
    }
}

// Initialize AI Studio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIStudio();
});