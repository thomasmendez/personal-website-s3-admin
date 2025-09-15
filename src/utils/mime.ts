export function getMimeTypeFromBase64(base64String: string) {
    // Remove data URL prefix if present
    const cleanBase64 = base64String.replace(/^data:.*?;base64,/, '');
    
    try {
        // Decode base64 to get the raw bytes
        const binaryString = atob(cleanBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < Math.min(binaryString.length, 12); i++) { // Only need first few bytes
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Check file signatures
        if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
            return 'image/jpeg';
        }
        if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
            return 'image/png';
        }
        if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
            return 'image/gif';
        }
        if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && 
            bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
            return 'image/webp';
        }
        if (bytes[0] === 0x42 && bytes[1] === 0x4D) {
            return 'image/bmp';
        }
        
        // Default fallback
        return 'application/octet-stream';
        
    } catch (e) {
        return null; // Invalid base64
    }
}