# RIAVIZ MOTORSPORT  
## Homepage Redesign – Full Design Forensic Audit

**Objective:** Pixel-perfect recreation inside AntiGravity / Elementor  
**Viewport Reference:** Desktop 1920 × 1080  
**Scope:** Desktop website only  
**Explicit Exclusion:** Mobile phone mockup is presentation-only and MUST NOT be included in the website build.

---

## 0. Global Design System

### Color Palette
- Primary Neon Green: `#9AD600`
- Secondary Green (hover / accents): `#6FA800`
- White (primary text): `#FFFFFF`
- Light Grey (secondary text): `#B5B5B5`
- Deep Black: `#0B0B0B`
- Charcoal Dark: `#141414`
- Carbon Texture Overlay: `#1A1A1A` @ 60–70% opacity

### Typography
- Primary Font: Montserrat / Oswald-style geometric sans
- Headings: Uppercase, semi-condensed, bold
- Body Text: Regular weight, high contrast

---

## 1. Page Canvas & Master Layout

### Global Container
- Max Width: 1320px
- Viewport Width Reference: 1920px
- Side Gutters: ~300px per side
- Content Alignment: Centered
- Background: Full-width dark textured surface

### Z-Index Layering
| Layer | Purpose |
|-----|--------|
| z-0 | Section background colors |
| z-1 | Background images |
| z-2 | Gradient overlays |
| z-3 | Text content |
| z-4 | CTA buttons |
| z-10 | Sticky header |

---

## 2. Proposal Header (NON-WEBSITE SECTION)

**IMPORTANT:**  
This section is part of the presentation only and MUST NOT be built in the website.

### Section Specs
- Height: ~280px
- Width: 100%
- Padding: 60px top / 60px bottom

### Elements
- Riaviz logo (left)
- Color palette swatches (right)
- Title centered

### Typography
- "PROPOSTA RESTYLING"
  - Font Size: ~56px
  - Weight: Bold
- "HOMEPAGE"
  - Font Size: ~56px
  - Color: Neon Green

---

## 3. Main Header / Navigation Bar

### Header Container
- Height: 90px
- Width: 100%
- Position: Sticky
- Z-Index: 10
- Background: Linear gradient `#0B0B0B → #151515`

### Layout Structure
- Left: Logo
- Center: Navigation Menu
- Right: CTA Button

### Logo
- Width: ~180px
- Vertical Alignment: Center

### Menu Items
- Font Size: ~14px
- Letter Spacing: +1px
- Color: White
- Active Item Underline: 2px Neon Green

### CTA Button
- Text: "CONTATTACI ORA"
- Size: 160 × 40px
- Padding: 20px horizontal
- Background: Neon Green
- Border Radius: 3px

### Elementor Mapping
- Header Template
  - Nav Menu Widget
  - Image Widget (Logo)
  - Button Widget (CTA)

---

## 4. Hero Section (Primary Visual Block)

### Section Container
- Height: ~620px
- Width: 100%
- Position: Relative
- Overflow: Hidden

### Background Image
- High-resolution motorsport car image
- Background Size: Cover
- Background Position: Center Right

### Overlay Layer
- Gradient Overlay:
  - Left: rgba(0,0,0,0.85)
  - Right: rgba(0,0,0,0.25)
- Z-Index: 2

### Content Block
- Max Width: 600px
- Padding Left: 80px
- Vertical Alignment: Center

### Headline
- Font Size: ~52px
- Line Height: 1.1
- White text with selective neon green keywords

### Subheadline
- Font Size: ~16px
- Margin Top: 20px
- Color: #CCCCCC

### Primary CTA
- Button Size: 180 × 48px
- Margin Top: 30px

### Elementor Mapping
- Section (Full Width)
  - Background Image
  - Background Overlay
  - Inner Section
    - Heading Widget
    - Text Widget
    - Button Widget

---

## 5. Services Preview Cards

### Section Container
- Height: ~220px
- Padding: 40px top / bottom
- Background: #0F0F0F

### Grid Layout
- Columns: 5
- Column Gap: 20px

### Card Specifications
- Card Size: ~240 × 140px
- Background: Image
- Image Overlay: Black @ 60%
- Bottom Label Bar:
  - Height: 36px
  - Background: Neon Green
  - Text Color: Black
  - Font Size: ~13px
  - Font Weight: Bold

### Hover Interaction
- Image Scale: +4%
- Overlay Opacity: Reduced

### Elementor Mapping
- Inner Section (5 columns)
- Image Box Widgets (custom overlay via CSS)

---

## 6. "IL METODO RIAVIZ" Section

### Section Container
- Height: ~260px
- Background: Dark gradient with neon accent lines

### Title
- Font Size: ~32px
- Alignment: Center
- "RIAVIZ" highlighted in neon green

### Process Steps Row
- Items: 4
- Icon Size: ~64px
- Label Font Size: ~14px

### Divider
- Color: Neon Green
- Thickness: 2px
- Width: ~120px

### Elementor Mapping
- Section
  - Heading Widget
  - Divider Widget
  - Icon Box Widgets (4)

---

## 7. Final Call-To-Action Section

### Section Container
- Height: ~180px
- Background: Black with subtle texture

### Content
- Heading:
  - Font Size: ~28px
  - Alignment: Center

### CTA Button
- Width: 200px
- Height: 48px

### Contact Info
- Phone and Email inline
- Font Size: ~14px
- Neon Green icon accents

### Elementor Mapping
- Section
  - Heading Widget
  - Button Widget
  - Icon List Widget

---

## 8. Mobile Mockup Clarification

- NOT part of the website
- NO Elementor section
- NO responsive container
- Presentation-only visual reference

---

## 9. AntiGravity / Elementor Build Rules

### Structural Rules
- Absolute positioning ONLY for overlays
- Reset Elementor default margins and paddings
- Use custom CSS for:
  - Gradient overlays
  - Image hover zoom
  - Neon glow accents

### Spacing System
- Vertical spacing increments: 20px / 40px / 80px
- Consistent CTA dimensions across sections

---

## Final Notes

This homepage is designed to communicate:
- Motorsport performance
- Technical authority
- Aggressive premium branding

All measurements are optimized for visual hierarchy and cinematic impact.
