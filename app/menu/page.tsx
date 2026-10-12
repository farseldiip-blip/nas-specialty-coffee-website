'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const logo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5vRDFya4S1xYmVKkwjQQK39nUDo1U1.png'
const dirtyPhoto = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-10-12%20014433-1nVLehWPtFVQYEI0d1Pi15BbMvFL3J.png'
const photos = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=85',
]
const menu = [
  ['Espresso', 'إسبريسو', 'قهوة قصيرة، مركزة، وصاحية', '75', photos[0]],
  ['Latte', 'لاتيه', 'إسبريسو ناعم بلبن دافي', '110', photos[1]],
  ['Cappuccino', 'كابتشينو', 'رغوة خفيفة وطعم قهوة واضح', '105', photos[2]],
  ['Flat White', 'فلات وايت', 'لبن حريري مع شوتين إسبريسو', '115', photos[3]],
  ['Iced Latte', 'آيس لاتيه', 'بارد، بسيط، ومناسب للجو', '120', photos[0]],
  ['V60', 'V60', 'صبّة هادية ونكهات واضحة', '130', photos[1]],
  ['Dirty Espresso', 'ديرتي إسبريسو', 'إسبريسو بارد فوق لبن مثلج', '125', dirtyPhoto],
  ['Spanish Latte', 'سبانيش لاتيه', 'حلو خفيف ولبن ناعم', '125', photos[2]],
  ['Matcha', 'ماتشا', 'ماتشا كريمي بلبن بارد', '130', photos[3]],
  ['Croissant', 'كرواسون', 'زبدة، طبقات، وقرمشة', '85', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85'],
  ['Cookies', 'كوكيز', 'مخبوزة طرية بقطع شوكولاتة', '70', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=85'],
  ['Cheesecake', 'تشيزكيك', 'قطعة كريمية مع قهوة الصبح', '115', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=85'],
] as const

function Logo() {
  return <Image src={logo} alt="NAS | ناس Specialty Coffee" width={120} height={70} className="logo" />
}

function MenuNav({ arabic, setArabic }: { arabic: boolean; setArabic: (value: boolean) => void }) {
  const [open, setOpen] = useState(false)
  const links = [
    ['Home', 'الرئيسية', '/'],
    ['Menu', 'المنيو', '/menu'],
    ['Gallery', 'الصور', '/#gallery'],
    ['Visit', 'زورنا', '/#visit'],
  ]
  return <header className="site-nav"><Link href="/" aria-label="NAS home"><Logo /></Link><nav className="desktop-nav">{links.map(([en, ar, href]) => <Link href={href} key={en}><span>{arabic ? ar : en}</span></Link>)}<span className="rule" /><button className="language-toggle" onClick={() => setArabic(!arabic)} aria-label="Switch language">{arabic ? 'EN' : 'عربي'}</button></nav><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open menu">{open ? 'Close' : 'Menu'}</button>{open && <div className="mobile-sheet"><button className="close-sheet" onClick={() => setOpen(false)} aria-label="Close menu">×</button>{links.map(([en, ar, href]) => <Link href={href} key={en} onClick={() => setOpen(false)}>{arabic ? ar : en}</Link>)}<span className="rule" /><button className="language-toggle" onClick={() => setArabic(!arabic)}>{arabic ? 'EN' : 'عربي'}</button></div>}</header>
}

export default function MenuPage() {
  const [arabic, setArabic] = useState(true)
  const copy = arabic ? { eyebrow: 'قائمة ناس', title: 'كل رشفة لها حكاية', intro: 'قهوة معمولة على مهلك، وحاجات حلوة تكمل يومك.', coffee: 'قهوة', food: 'حلو مع القهوة', home: 'العودة للرئيسية', note: 'الأسعار بالجنيه المصري' } : { eyebrow: 'THE NAS MENU', title: 'A slower kind of coffee', intro: 'Coffee made with care, and something sweet for the day ahead.', coffee: 'Coffee', food: 'Something sweet', home: 'Back home', note: 'Prices in Egyptian pounds' }
  const groups = [{ title: copy.coffee, items: menu.slice(0, 9) }, { title: copy.food, items: menu.slice(9) }]
  return <div className="site menu-page" dir={arabic ? 'rtl' : 'ltr'}><MenuNav arabic={arabic} setArabic={setArabic} /><main><section className="menu-hero"><div><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.intro}</p></div><span className="menu-index">MENU / 01</span></section><section className="menu-list">{groups.map((group) => <section className="menu-group" key={group.title}><div className="menu-group-heading"><span>—</span><h2>{group.title}</h2><small>{copy.note}</small></div><div className="menu-full-grid">{group.items.map((item) => <article className="menu-card" key={item[0]}><div className="menu-image"><Image src={item[4]} alt={`${item[0]} — ${item[1]} at NAS`} fill sizes="(max-width: 640px) 50vw, 25vw" /></div><div className="menu-card-body"><div><h3>{item[0]}</h3><p className="arabic">{item[1]}</p></div><span>{item[3]} EGP</span><p>{item[2]}</p></div></article>)}</div></section>)}</section></main><footer className="menu-footer"><Link href="/" className="text-link">{copy.home} <i /></Link><span>NAS / 15 MAY CITY / CAIRO</span></footer></div>
}

