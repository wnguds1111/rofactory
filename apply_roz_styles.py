import os
import glob
import re

html_files = glob.glob(r'c:\Users\GRAVITY\Desktop\Anti\ro_factory\*.html')

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Update Typography Google Fonts link
    content = content.replace('family=Pretendard:wght', 'family=Poppins:wght')
    content = content.replace('Use Pretendard', 'Use Poppins')
    
    # 2. Update inline huge border-radiuses to ROZ brand style (8px-12px)
    content = content.replace('border-radius: 50px;', 'border-radius: 8px;')
    content = content.replace('border-radius: 30px;', 'border-radius: 12px;')
    content = content.replace('border-radius: 20px;', 'border-radius: 12px;')
    content = content.replace('border-radius:50px;', 'border-radius: 8px;')
    content = content.replace('border-radius:30px;', 'border-radius:12px;')
    content = content.replace('border-radius:20px;', 'border-radius:12px;')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

# Process styles.css too for border-radius adjustments 
css_file = r'c:\Users\GRAVITY\Desktop\Anti\ro_factory\styles.css'
with open(css_file, 'r', encoding='utf-8') as file:
    css_content = file.read()
    
# Lower border radii globally for buttons and cards 
css_content = css_content.replace('border-radius: 50px;', 'border-radius: 8px;')
css_content = css_content.replace('border-radius: 30px;', 'border-radius: 12px;')
css_content = css_content.replace('border-radius: 20px;', 'border-radius: 12px;')
css_content = css_content.replace('border-radius: 50%;', 'border-radius: 50%;') # Keep perfectly round elements (like pagination dots)
css_content = css_content.replace('border-radius: 28px;', 'border-radius: 12px;')
css_content = css_content.replace('border-radius: 24px;', 'border-radius: 12px;')

with open(css_file, 'w', encoding='utf-8') as file:
    file.write(css_content)

print("Batch ROZ styling update applied successfully to HTML and CSS files.")
