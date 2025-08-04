class ImageGenerator {
    constructor(apiKey) {
        // Note: For Google Studio API integration, you need:
        // 1. A Google Cloud Project with Vertex AI API enabled
        // 2. Service account credentials or OAuth token
        // 3. Replace 'YOUR_PROJECT_ID' in the API URL with your actual project ID
        this.apiKey = apiKey;
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
        this.initializeElements();
        this.bindEvents();
        this.selectedDevice = 'web';
        this.selectedStyles = ['dark', 'formal'];
        this.servicePrompts = {
            'web-development': 'A modern, professional website interface with clean design, responsive layout, and user-friendly navigation',
            'mobile-apps': 'A sleek mobile application interface with intuitive user experience, modern UI elements, and engaging design',
            'ai-solutions': 'An advanced AI-powered dashboard with data visualization, machine learning interfaces, and futuristic design elements',
            'digital-marketing': 'A compelling digital marketing campaign visual with engaging graphics, brand elements, and call-to-action design',
            'graphic-design': 'A creative graphic design piece with artistic elements, typography, color harmony, and visual impact',
            'video-editing': 'A professional video editing workspace with timeline, effects panels, and cinematic visual elements',
            'drone-services': 'Aerial drone photography showcasing landscapes, real estate, or commercial properties with stunning perspectives',
            'it-consulting': 'A professional IT consulting presentation with technology diagrams, business solutions, and corporate design'
        };
        this.examplePrompts = [
            'A modern landing page for a fintech startup with clean design and professional imagery',
            'An e-commerce website for sustainable fashion with eco-friendly aesthetics',
            'A SaaS dashboard for project management with intuitive user interface',
            'A portfolio website for a creative agency with bold typography and animations',
            'A mobile banking app interface with secure and user-friendly design'
        ];
    }

    initializeElements() {
        this.promptInput = document.getElementById('imagePrompt');
        this.styleInput = document.getElementById('styleInput');
        this.charCounter = document.getElementById('charCount');
        this.styleCharCounter = document.getElementById('styleCharCount');
        this.deviceOptions = document.querySelectorAll('.device-option');
        this.styleTags = document.querySelectorAll('.style-tag');
        this.advancedToggle = document.getElementById('advancedToggle');
        this.advancedOptions = document.querySelector('.advanced-options');
        this.generateBtn = document.getElementById('generateBtn');
        this.tryExampleBtn = document.querySelector('.try-example-btn');
        this.servicePicker = document.getElementById('serviceType');
        this.sizePicker = document.getElementById('imageSize');
    }

    bindEvents() {
        // Character counters
        if (this.promptInput && this.charCounter) {
            this.promptInput.addEventListener('input', () => {
                const count = this.promptInput.value.length;
                this.charCounter.textContent = count;
                this.charCounter.style.color = count > 280 ? '#FF3B30' : '#8e8e93';
            });
        }

        if (this.styleInput && this.styleCharCounter) {
            this.styleInput.addEventListener('input', () => {
                const count = this.styleInput.value.length;
                this.styleCharCounter.textContent = count;
                this.styleCharCounter.style.color = count > 140 ? '#FF3B30' : '#8e8e93';
            });
        }

        // Device selection
        this.deviceOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.deviceOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                this.selectedDevice = option.dataset.device;
            });
        });

        // Style tag selection (multiple)
        this.styleTags.forEach(tag => {
            tag.addEventListener('click', () => {
                tag.classList.toggle('active');
                const style = tag.dataset.style;
                if (this.selectedStyles.includes(style)) {
                    this.selectedStyles = this.selectedStyles.filter(s => s !== style);
                } else {
                    this.selectedStyles.push(style);
                }
            });
        });

        // Advanced options toggle
        if (this.advancedToggle && this.advancedOptions) {
            this.advancedToggle.addEventListener('click', () => {
                const isVisible = this.advancedOptions.style.display !== 'none';
                this.advancedOptions.style.display = isVisible ? 'none' : 'block';
                this.advancedToggle.innerHTML = isVisible ? 
                    '<i class="fas fa-cog"></i> Advanced Options' : 
                    '<i class="fas fa-times"></i> Hide Advanced';
            });
        }

        // Try example button
        if (this.tryExampleBtn) {
            this.tryExampleBtn.addEventListener('click', () => {
                this.useRandomExample();
            });
        }

        // Generate button
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', () => {
                this.handleGenerate();
            });
        }
    }

    useRandomExample() {
        const randomExample = this.examplePrompts[Math.floor(Math.random() * this.examplePrompts.length)];
        if (this.promptInput) {
            this.promptInput.value = randomExample;
            this.promptInput.dispatchEvent(new Event('input'));
        }
    }

    useExample(prompt) {
        if (this.promptInput) {
            this.promptInput.value = prompt;
            this.promptInput.dispatchEvent(new Event('input'));
        }
    }

    async handleGenerate() {
        const prompt = this.promptInput?.value?.trim();
        if (!prompt) {
            alert('Please describe your project');
            return;
        }

        this.generateBtn.disabled = true;
        this.generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

        try {
            const enhancedPrompt = this.buildEnhancedPrompt(prompt);
            const description = await this.generateImageDescription(enhancedPrompt);
            const imageUrl = await this.generateImageFromDescription(description);
            
            const result = {
                imageUrl,
                description: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
                device: this.selectedDevice.charAt(0).toUpperCase() + this.selectedDevice.slice(1),
                styles: this.selectedStyles.length > 0 ? this.selectedStyles : ['Default'],
                timestamp: new Date().toISOString(),
                originalPrompt: prompt
            };
            
            this.displayResult(result);
        } catch (error) {
            console.error('Generation failed:', error);
            alert('Failed to generate image. Please try again.');
        } finally {
            this.generateBtn.disabled = false;
            this.generateBtn.innerHTML = 'Generate my project <span class="beta-badge">Beta</span>';
        }
    }

    buildEnhancedPrompt(basePrompt) {
        const styleInput = this.styleInput?.value?.trim() || '';
        const deviceContext = this.getDeviceContext();
        const styleContext = this.getStyleContext();
        
        let enhancedPrompt = basePrompt || this.promptInput.value.trim();
        
        if (styleInput) {
            enhancedPrompt += `. Style: ${styleInput}`;
        }
        
        if (deviceContext) {
            enhancedPrompt += `. ${deviceContext}`;
        }
        
        if (styleContext) {
            enhancedPrompt += `. ${styleContext}`;
        }
        
        return enhancedPrompt.trim();
    }

    getDeviceContext() {
        const deviceContext = {
            'web': 'designed for desktop website interface',
            'mobile': 'designed for mobile app interface',
            'tablet': 'designed for tablet application interface'
        };
        
        return deviceContext[this.selectedDevice] || 'designed for web interface';
    }

    getStyleContext() {
        if (this.selectedStyles.length > 0) {
            return `with ${this.selectedStyles.join(' and ')} styling`;
        }
        return '';
    }

    displayResult(result) {
        this.showImageModal(result);
    }

    showImageModal(result) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'image-modal-overlay';
        modal.innerHTML = `
            <div class="image-modal">
                <div class="modal-header">
                    <h3>Generated Image</h3>
                    <button class="modal-close" onclick="this.closest('.image-modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <div class="modal-image">
                        <img src="${result.imageUrl}" alt="Generated image" />
                    </div>
                    <div class="modal-details">
                        <p><strong>Device:</strong> ${result.device}</p>
                        <p><strong>Styles:</strong> ${result.styles.join(', ')}</p>
                        <p><strong>Description:</strong> ${result.description}</p>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn download-btn" onclick="imageGenerator.downloadImage('${result.imageUrl}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="modal-btn regenerate-btn" onclick="imageGenerator.regenerateImage(); this.closest('.image-modal-overlay').remove();">
                        <i class="fas fa-redo"></i> Regenerate
                    </button>
                </div>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(modal);
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    regenerateImage() {
        this.handleGenerate();
    }

    downloadImage(url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'generated-image.jpg';
        link.click();
    }

    async generateImageDescription(prompt, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}/gemini-pro:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Create a detailed image description for: ${prompt}. Make it professional, modern, and suitable for a technology company website. Include specific details about lighting, composition, colors, and atmosphere.`
                        }]
                    }],
                    generationConfig: {
                        temperature: options.temperature || 0.7,
                        topK: options.topK || 40,
                        topP: options.topP || 0.95,
                        maxOutputTokens: options.maxTokens || 1024,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('No content generated');
            }
        } catch (error) {
            console.error('Error generating image description:', error);
            throw error;
        }
    }

    // Generate image using Google Studio API (Imagen)
    async generateImageFromDescription(description, size = '1024x1024') {
        try {
            // Use Google's Imagen API through Vertex AI
            const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/imagegeneration@006:predict`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    instances: [{
                        prompt: description,
                        sampleCount: 1,
                        aspectRatio: this.getAspectRatio(size),
                        safetyFilterLevel: "block_some",
                        personGeneration: "dont_allow"
                    }],
                    parameters: {
                        sampleCount: 1
                    }
                })
            });

            if (!response.ok) {
                console.warn('Google Studio API not available, using fallback');
                return this.generateFallbackImage(description, size);
            }

            const data = await response.json();
            
            if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
                // Convert base64 to blob URL
                const base64Data = data.predictions[0].bytesBase64Encoded;
                const binaryString = atob(base64Data);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                const blob = new Blob([bytes], { type: 'image/png' });
                return URL.createObjectURL(blob);
            } else {
                throw new Error('No image generated');
            }
        } catch (error) {
            console.error('Error generating image with Google Studio API:', error);
            // Fallback to placeholder service
            return this.generateFallbackImage(description, size);
        }
    }

    generateFallbackImage(description, size) {
        const [width, height] = size.split('x');
        const keywords = this.extractKeywords(description);
        const query = keywords.join(',');
        const seed = this.generateSeed(description);
        
        return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}&sig=${seed}`;
    }

    getAspectRatio(size) {
        const [width, height] = size.split('x').map(Number);
        const ratio = width / height;
        
        if (ratio > 1.5) return '16:9';
        if (ratio > 1.2) return '4:3';
        if (ratio < 0.8) return '9:16';
        return '1:1';
    }

    extractKeywords(description) {
        const techKeywords = ['technology', 'digital', 'modern', 'professional', 'business', 'workspace', 'computer', 'office'];
        const words = description.toLowerCase().split(/\s+/);
        const relevantWords = words.filter(word => 
            word.length > 4 && 
            !['the', 'and', 'with', 'for', 'this', 'that', 'from', 'they', 'have', 'will'].includes(word)
        );
        
        return [...new Set([...techKeywords.slice(0, 2), ...relevantWords.slice(0, 3)])];
    }

    generateSeed(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    // Get predefined service-related prompts
    getServicePrompt(serviceType) {
        return CONFIG.SERVICE_PROMPTS[serviceType] || 'Professional technology workspace with modern equipment and clean design';
    }

    // Generate image for specific Prosoft services
    async generateServiceImage(serviceType, customPrompt = '', size = '1024x1024') {
        try {
            const basePrompt = this.getServicePrompt(serviceType);
            const fullPrompt = customPrompt ? `${basePrompt}, ${customPrompt}` : basePrompt;
            
            const description = await this.generateImageDescription(fullPrompt);
            const imageUrl = await this.generateImageFromDescription(description, size);
            
            return {
                imageUrl,
                description,
                prompt: fullPrompt,
                serviceType
            };
        } catch (error) {
            console.error('Error generating service image:', error);
            throw error;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageGenerator;
}