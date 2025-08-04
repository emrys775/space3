class AIImageHandler {
    constructor() {
        this.imageGenerator = new ImageGenerator(CONFIG.GOOGLE_AI_API_KEY);
        this.generatedImages = [];
        this.currentImageIndex = 0;
        this.initializeEventListeners();
        this.setupServiceSelection();
    }

    initializeEventListeners() {
        // Main controls
        const generateBtn = document.getElementById('generateBtn');
        const clearBtn = document.getElementById('clearBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const regenerateBtn = document.getElementById('regenerateBtn');
        const useImageBtn = document.getElementById('useImageBtn');
        const retryBtn = document.getElementById('retryBtn');
        const serviceType = document.getElementById('serviceType');

        generateBtn?.addEventListener('click', () => this.handleGenerate());
        clearBtn?.addEventListener('click', () => this.handleClear());
        downloadBtn?.addEventListener('click', () => this.handleDownload());
        regenerateBtn?.addEventListener('click', () => this.handleGenerate());
        useImageBtn?.addEventListener('click', () => this.handleUseImage());
        retryBtn?.addEventListener('click', () => this.handleGenerate());
        serviceType?.addEventListener('change', () => this.handleServiceChange());

        // Enter key support for textarea
        const promptTextarea = document.getElementById('imagePrompt');
        promptTextarea?.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.handleGenerate();
            }
        });
    }

    setupServiceSelection() {
        const serviceType = document.getElementById('serviceType');
        const promptTextarea = document.getElementById('imagePrompt');
        
        if (serviceType && promptTextarea) {
            serviceType.addEventListener('change', () => {
                const selectedService = serviceType.value;
                if (selectedService !== 'custom') {
                    const servicePrompt = this.imageGenerator.getServicePrompt(selectedService);
                    promptTextarea.placeholder = `Base prompt: ${servicePrompt}\n\nAdd your custom details here...`;
                } else {
                    promptTextarea.placeholder = 'Describe the image you want to generate...';
                }
            });
        }
    }

    handleServiceChange() {
        const serviceType = document.getElementById('serviceType').value;
        const promptTextarea = document.getElementById('imagePrompt');
        
        if (serviceType !== 'custom') {
            // Clear custom prompt when switching to predefined service
            promptTextarea.value = '';
        }
    }

    async handleGenerate() {
        const serviceType = document.getElementById('serviceType').value;
        const customPrompt = document.getElementById('imagePrompt').value.trim();
        const size = document.getElementById('imageSize').value;
        const style = document.getElementById('imageStyle').value;

        // Validate input
        if (serviceType === 'custom' && !customPrompt) {
            this.showError('Please enter a description for your image.');
            return;
        }

        this.showLoading();
        this.hideError();

        try {
            let result;
            
            if (serviceType === 'custom') {
                // Generate from custom prompt
                const enhancedPrompt = `${customPrompt}, ${style} style, high quality, professional`;
                const description = await this.imageGenerator.generateImageDescription(enhancedPrompt);
                const imageUrl = await this.imageGenerator.generateImageFromDescription(description, size);
                
                result = {
                    imageUrl,
                    description,
                    prompt: enhancedPrompt,
                    serviceType: 'custom'
                };
            } else {
                // Generate from service template
                const enhancedCustomPrompt = customPrompt ? `${customPrompt}, ${style} style` : `${style} style`;
                result = await this.imageGenerator.generateServiceImage(serviceType, enhancedCustomPrompt, size);
            }
            
            this.addToGallery(result);
            this.showGeneratedImage(result);
            
        } catch (error) {
            console.error('Generation failed:', error);
            this.showError(`Failed to generate image: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }

    handleClear() {
        document.getElementById('imagePrompt').value = '';
        document.getElementById('serviceType').value = 'custom';
        document.getElementById('imageSize').value = '1024x1024';
        document.getElementById('imageStyle').value = 'professional';
        this.hideGeneratedImage();
        this.hideError();
    }

    handleDownload() {
        const image = document.getElementById('resultImage');
        if (image.src) {
            const link = document.createElement('a');
            link.href = image.src;
            link.download = `prosoft-generated-image-${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    handleUseImage() {
        const image = document.getElementById('resultImage');
        if (image.src) {
            // Emit custom event for parent components to handle
            const event = new CustomEvent('imageSelected', {
                detail: {
                    imageUrl: image.src,
                    description: document.getElementById('imageDescription').textContent,
                    timestamp: Date.now()
                }
            });
            document.dispatchEvent(event);
            
            // Show success message
            this.showSuccess('Image selected successfully!');
        }
    }

    addToGallery(imageData) {
        this.generatedImages.unshift(imageData);
        
        // Keep only last 10 images
        if (this.generatedImages.length > 10) {
            this.generatedImages = this.generatedImages.slice(0, 10);
        }
        
        this.updateGallery();
    }

    updateGallery() {
        const gallery = document.getElementById('imagesGallery');
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (this.generatedImages.length > 0) {
            gallery.style.display = 'block';
            
            galleryGrid.innerHTML = this.generatedImages.map((img, index) => `
                <div class="gallery-item" data-index="${index}">
                    <img src="${img.imageUrl}" alt="Generated image ${index + 1}" />
                    <div class="gallery-item-overlay">
                        <button class="gallery-btn" onclick="aiImageHandler.selectFromGallery(${index})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="gallery-btn" onclick="aiImageHandler.downloadFromGallery(${index})">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    selectFromGallery(index) {
        const imageData = this.generatedImages[index];
        if (imageData) {
            this.showGeneratedImage(imageData);
            this.currentImageIndex = index;
        }
    }

    downloadFromGallery(index) {
        const imageData = this.generatedImages[index];
        if (imageData) {
            const link = document.createElement('a');
            link.href = imageData.imageUrl;
            link.download = `prosoft-${imageData.serviceType}-${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    showLoading() {
        document.getElementById('loadingSpinner').style.display = 'block';
        document.getElementById('generatedImage').style.display = 'none';
        document.getElementById('generateBtn').disabled = true;
        document.getElementById('generateBtn').textContent = 'Generating...';
    }

    hideLoading() {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('generateBtn').disabled = false;
        document.getElementById('generateBtn').textContent = 'Generate Image';
    }

    showGeneratedImage(imageData) {
        const resultImage = document.getElementById('resultImage');
        const imageDescription = document.getElementById('imageDescription');
        
        resultImage.src = imageData.imageUrl;
        imageDescription.textContent = imageData.description || 'Professional generated image';
        
        document.getElementById('generatedImage').style.display = 'block';
    }

    hideGeneratedImage() {
        document.getElementById('generatedImage').style.display = 'none';
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        errorText.textContent = message;
        errorDiv.style.display = 'block';
    }

    hideError() {
        document.getElementById('errorMessage').style.display = 'none';
    }

    showSuccess(message) {
        // Create temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        const container = document.querySelector('.image-generator-container');
        container.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Global instance for gallery interactions
let aiImageHandler;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if the image generator widget is present
    if (document.querySelector('.image-generator-container')) {
        aiImageHandler = new AIImageHandler();
    }
});