#!/usr/bin/env python3
"""Generate web-ready imagery without exposing private portfolio data."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'portrait-source.png'
WEBP = ROOT / 'portrait.webp'
SOCIAL = ROOT / 'social-preview.png'


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    directory = Path('/usr/share/fonts/truetype/dejavu')
    options = {
        'sans': 'DejaVuSans.ttf',
        'bold': 'DejaVuSans-Bold.ttf',
        'serif': 'DejaVuSerif.ttf',
    }
    return ImageFont.truetype(str(directory / options[name]), size)


def build() -> None:
    if not SOURCE.is_file():
        raise SystemExit('Missing portrait-source.png; cannot build portfolio image assets.')

    with Image.open(SOURCE) as loaded:
        portrait = loaded.convert('RGB')

    portrait.thumbnail((900, 900), Image.Resampling.LANCZOS)
    portrait.save(WEBP, 'WEBP', quality=83, method=6)

    card = Image.new('RGB', (1200, 630), '#173c35')
    draw = ImageDraw.Draw(card)
    draw.rounded_rectangle((16, 16, 1184, 614), radius=28, outline='#55756b', width=2)
    draw.rectangle((0, 0, 16, 630), fill='#d8f297')
    draw.rounded_rectangle((75, 77, 234, 113), radius=16, fill='#d8f297')
    draw.text((93, 84), 'PORTFOLIO', font=font('bold', 15), fill='#173c35')
    draw.text((76, 145), 'CHENTHAMIL', font=font('bold', 51), fill='#fffefa')
    draw.text((76, 211), 'SELVAN', font=font('bold', 65), fill='#fffefa')
    draw.line((78, 303, 665, 303), fill='#7f9c8f', width=2)
    draw.text((76, 334), 'BUSINESS ANALYSIS  /  CX TRANSFORMATION',
              font=font('bold', 18), fill='#d8f297')
    draw.text((76, 370), 'AI & AUTOMATION  /  PROJECT DELIVERY',
              font=font('bold', 18), fill='#d8f297')
    draw.text((76, 446), 'Turning customer friction into',
              font=font('serif', 24), fill='#f8f7f2')
    draw.text((76, 480), 'simpler, smarter operations.',
              font=font('serif', 24), fill='#f8f7f2')
    draw.text((76, 570), 'webbee1991.github.io/Thamil-s/',
              font=font('sans', 17), fill='#cedecc')

    # Retain the supplied portrait, framed in a light rounded card.
    draw.rounded_rectangle((762, 71, 1123, 555), radius=26, fill='#c9ddb0')
    draw.rounded_rectangle((749, 59, 1110, 543), radius=26, fill='#fffefa')
    visible = ImageOps.fit(portrait, (337, 459), method=Image.Resampling.LANCZOS,
                           centering=(0.5, 0.40))
    mask = Image.new('L', (337, 459), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, 336, 458), radius=17, fill=255)
    card.paste(visible, (761, 71), mask)

    card.save(SOCIAL, 'PNG', optimize=True)
    print(f'Portrait: {WEBP.name} ({WEBP.stat().st_size:,} bytes)')
    print(f'Social card: {SOCIAL.name} ({SOCIAL.stat().st_size:,} bytes)')


if __name__ == '__main__':
    build()
