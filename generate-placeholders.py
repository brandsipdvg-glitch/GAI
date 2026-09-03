#!/usr/bin/env python3
"""
Placeholder Image Generator for Gagan Aqua Industries
Generates simple placeholder images for development
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder(text, filename, width=400, height=400, bg_color=(0, 119, 182), text_color=(255, 255, 255)):
    """Create a placeholder image with text"""
    # Create image
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Add gradient effect
    for y in range(height):
        for x in range(width):
            # Simple diagonal gradient
            gradient = (x + y) / (width + height)
            r = int(bg_color[0] * (1 - gradient * 0.3))
            g = int(bg_color[1] * (1 - gradient * 0.3))
            b = int(bg_color[2] * (1 - gradient * 0.3))
            draw.point((x, y), fill=(r, g, b))
    
    # Add text
    try:
        # Try to use a larger font
        font_size = min(width, height) // 10
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        # Fallback to default font
        font = ImageFont.load_default()
    
    # Get text bounding box
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    # Center text
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # Draw text with shadow
    draw.text((x+2, y+2), text, fill=(0, 0, 0), font=font)
    draw.text((x, y), text, fill=text_color, font=font)
    
    # Add border
    draw.rectangle([(0, 0), (width-1, height-1)], outline=(255, 255, 255), width=2)
    
    # Save image
    img.save(filename, quality=95)
    print(f"Created: {filename}")

def main():
    """Generate all placeholder images"""
    
    # Create directories if they don't exist
    directories = ['images/products', 'images/about', 'images/custom']
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
    
    # Product placeholders
    products = [
        ('300ml Water Bottle', 'images/products/300ml-bottle.png'),
        ('500ml Water Bottle', 'images/products/500ml-bottle.png'),
        ('1L Water Bottle', 'images/products/1l-bottle.png'),
        ('2L Water Bottle', 'images/products/2l-bottle.png'),
        ('20L Water Can', 'images/products/20l-can.png'),
        ('Custom Branded Bottle', 'images/products/custom-bottle.png'),
    ]
    
    for text, filename in products:
        create_placeholder(text, filename, 400, 400)
    
    # About section placeholder
    create_placeholder('Manufacturing Facility', 'images/about/factory.png', 600, 400, (0, 93, 146))
    
    # Custom section placeholder
    create_placeholder('Custom Bottles Showcase', 'images/custom/custom-showcase.png', 600, 500, (0, 168, 232))
    
    # Logo placeholder
    create_placeholder('GAGAN\nAQUA', 'images/logo.png', 200, 100, (0, 119, 182))
    
    # Favicon
    create_placeholder('GA', 'images/favicon.png', 64, 64, (0, 119, 182))
    
    print("\nAll placeholder images created successfully!")
    print("\nTo replace with actual images:")
    print("1. Replace files in images/products/ with your product photos")
    print("2. Replace images/logo.png with your company logo")
    print("3. Replace images/about/factory.png with your facility photo")
    print("4. Update dimensions in CSS if needed")

if __name__ == "__main__":
    main()