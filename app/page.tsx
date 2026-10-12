'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

const logo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5vRDFya4S1xYmVKkwjQQK39nUDo1U1.png'
const heroPhoto = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-10-12%20014349-pf5whmDqWuPkNUUDYuLLYjWTgqYGGL.png'
const dirtyPhoto = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-10-12%20014433-1nVLehWPtFVQYEI0d1Pi15BbMvFL3J.png'
const photos = [
  heroPhoto,
  dirtyPhoto,
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=85',
]
const menu = [
  ['Espresso', 'إسبريسو', 'قهوة قصيرة، مركزة، وصاحية', '75', photos[2]],
  ['Latte', 'لاتيه', 'إسبريسو ناعم بلبن دافي', '110', photos[3]],
  ['Cappuccino', 'كابتشينو', 'رغوة خفيفة وطعم قهوة واضح', '105', photos[4]],
  ['Flat White', 'فلات وايت', 'لبن حريري مع شوتين إسبريسو', '115', photos[5]],
  ['Iced Latte', 'آيس لاتيه', 'بارد، بسيط، ومناسب للجو', '120', photos[2]],
  ['V60', 'V60', 'صبّة هادية ونكهات واضحة', '130', photos[3]],
  ['Dirty Espresso', 'ديرتي إسبريسو', 'إسبريسو بارد فوق لبن مثلج', '125', dirtyPhoto],
  ['Spanish Latte', 'سبانيش لاتيه', 'حلو خفيف ولبن ناعم', '125', photos[4]],
  ['Matcha', 'ماتشا', 'ماتشا كريمي بلبن بارد', '130', photos[5]],
  ['Croissant', 'كرواسون', 'زبدة، طبقات، وقرمشة', '85', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85'],
  ['Cookies', 'كوكيز', 'مخبوزة طرية بقطع شوكولاتة', '70', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=85'],
  ['Cheesecake', 'تشيزكيك', 'قطعة كريمية مع قهوة الصبح', '115', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=85'],
]
const nav = [
  ['Home', 'الرئيسية', '#home'],
  ['Menu', 'المنيو', '#menu'],
  ['Gallery', 'الصور', '#gallery'],
  ['Visit', 'زورنا', '#visit'],
]

function Logo({ dark = false }: { dark?: boolean }) {
  return <Image src={logo} alt="NAS | ناس Specialty Coffee" width={120} height={70} className={dark ? 'logo logo-dark' : 'logo'} />
}

function IntroLoader() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    if (sessionStorage.getItem('nas-intro-seen')) { setVisible(false); return }
    const timer = window.setTimeout(() => { sessionStorage.setItem('nas-intro-seen', '1'); setVisible(false); window.dispatchEvent(new Event('intro:done')) }, 2400)
    return () => window.clearTimeout(timer)
  }, [])
  if (!visible) return null
  return <div className="intro-loader" role="status" aria-label="NAS Specialty Coffee"><div className="intro-logo"><Logo /><div className="intro-fill"><Logo /></div></div><p>Life begins after coffee</p></div>
}

function MenuCard({ item }: { item: typeof menu[number] }) {
  return <article className="menu-card"><div className="menu-image"><Image src={item[4]} alt={`${item[0]} — ${item[1]} coffee at NAS`} fill sizes="(max-width: 640px) 50vw, 25vw" /></div><div className="menu-card-body"><div><h3>{item[0]}</h3><p className="arabic">{item[1]}</p></div><span>{item[3]} EGP</span><p>{item[2]}</p></div></article>
}

function Nav({ arabic, setArabic }: { arabic: boolean; setArabic: (value: boolean) => void }) {
  const [open, setOpen] = useState(false)
  return <header className="site-nav"><Link href="#home" aria-label="NAS home"><Logo /></Link><nav className="desktop-nav">{nav.map(([en, ar, href]) => <Link href={href} key={en}><span>{arabic ? ar : en}</span></Link>)}<span className="rule" /><button className="language-toggle" onClick={() => setArabic(!arabic)} aria-label="Switch language">{arabic ? 'EN' : 'عربي'}</button></nav><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open menu">{open ? 'Close' : 'Menu'}</button>{open && <div className="mobile-sheet"><button className="close-sheet" onClick={() => setOpen(false)} aria-label="Close menu">×</button>{nav.map(([en, ar, href]) => <Link href={href} key={en} onClick={() => setOpen(false)}>{arabic ? ar : en}</Link>)}<span className="rule" /><button className="language-toggle" onClick={() => setArabic(!arabic)}>{arabic ? 'EN' : 'عربي'}</button></div>}</header>
}

export default function Page() {
  const [arabic, setArabic] = useState(true)
  const [warm, setWarm] = useState(false)
  const [query, setQuery] = useState('')
  useEffect(() => { const onScroll = () => setWarm(true); window.addEventListener('scroll', onScroll, { once: true, passive: true }); const onIntro = () => setWarm(true); window.addEventListener('intro:done', onIntro); return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('intro:done', onIntro) } }, [])
  const filtered = useMemo(() => menu.filter(item => item[0].toLowerCase().includes(query.toLowerCase()) || item[1].includes(query)), [query])
  const t = arabic ? { title: 'قهوتك مستنياك', sub: 'الحياة بتبدأ بعد القهوة', pour: 'صبّ القهوة', chapters: 'فصول اليوم', menu: 'من المنيو', all: 'كل اللي بتحبه', visit: 'مستنيينك', instagram: 'تابعنا على إنستجرام', location: 'القاهرة — مدينة 15 مايو', from: 'يومياً من 8 الصبح' } : { title: 'Your coffee is waiting', sub: 'Life begins after coffee', pour: 'Pour into the day', chapters: 'Chapters of the day', menu: 'From the menu', all: 'A few favourites', visit: 'Come by', instagram: 'Follow on Instagram', location: 'Cairo — 15 May City', from: 'Daily from 8 AM' }
  return <div className={`site ${warm ? 'is-warm' : ''}`} dir={arabic ? 'rtl' : 'ltr'}><IntroLoader /><Nav arabic={arabic} setArabic={setArabic} /><main id="home"><section className="hero"><div className="hero-photo"><Image src={heroPhoto} alt="White NAS cups and latte in warm morning light" fill priority sizes="(max-width: 700px) 100vw, 62vw" onError={(event) => { event.currentTarget.src = photos[2] }} /><div className="hero-photo-caption"><span>15° 00&apos; 24&apos;&apos; N</span><span>CAIRO / EGYPT</span></div></div><div className="hero-copy"><div className="hero-copy-inner"><span className="eyebrow">NAS <i /> ناس</span><h1>{t.title}</h1><p>{t.sub}</p><button className="cut-button" onClick={() => setWarm(true)}>{t.pour}</button></div><div className="hero-meta"><span>01 / 04</span><span>{arabic ? 'مدينة 15 مايو' : '15 May City'}</span></div></div></section><section className="chapters section"><div className="section-heading"><span>01</span><h2>{t.chapters}</h2><b>{arabic ? 'حكاية صغيرة مع كل رشفة' : 'A small story with every sip'}</b></div><div className="chapter-grid"><article><Image src={photos[0]} alt="NAS cups arranged on a wooden table" fill sizes="33vw" /><div><small>01</small><h3>قبل القهوة</h3><p>لسه اليوم بيبدأ.</p></div></article><article><Image src={photos[1]} alt="Iced dirty espresso in a NAS cup" fill sizes="33vw" /><div><small>02</small><h3>الصبّة</h3><p>خد وقتك. إحنا هنا.</p></div></article><article><Image src={photos[3]} alt="Pour over coffee beside a window" fill sizes="33vw" /><div><small>03</small><h3>بعد القهوة</h3><p>الدنيا بقت أهدى شوية.</p></div></article></div></section><section className="section menu-preview" id="menu"><div className="section-heading"><span>02</span><h2>{t.menu}</h2><b>{t.all}</b></div><div className="menu-grid">{menu.slice(1, 5).map(item => <MenuCard item={item} key={item[0]} />)}</div><div className="center"><Link className="text-link" href="#full-menu">{arabic ? 'شوف المنيو كاملة' : 'See full menu'} <i /></Link></div></section><section className="amenities"><div><span className="amenity-mark">⌁</span><strong>Wi-Fi</strong><p>{arabic ? 'الواي فاي شغال' : 'Wi-Fi is on'}</p></div><div><span className="amenity-mark">□</span><strong>{arabic ? 'مناسب للابتوب' : 'Laptop friendly'}</strong><p>{arabic ? 'اقعد على راحتك' : 'Stay a while'}</p></div><div><span className="amenity-mark">08</span><strong>{t.from}</strong><p>{arabic ? 'ابدأ يومك بدري' : 'Start early'}</p></div></section><section className="section gallery" id="gallery"><div className="section-heading"><span>03</span><h2>{arabic ? 'من جوّه ناس' : 'Inside NAS'}</h2><b>{arabic ? 'تفاصيل بنحبها' : 'Details we love'}</b></div><div className="gallery-grid">{photos.slice(2).map((photo, i) => <div key={photo} className={`gallery-tile tile-${i}`}><Image src={photo} alt="Warm cream and mocha coffee detail at NAS" fill sizes="(max-width: 700px) 50vw, 25vw" /></div>)}</div></section><section className="visit section" id="visit"><div><div className="section-heading"><span>04</span><h2>{t.visit}</h2><b>{arabic ? 'بابنا مفتوح' : 'Our door is open'}</b></div><p className="visit-big">{t.location}</p><p>{t.from}<br />Wi-Fi · {arabic ? 'مناسب للابتوب' : 'laptop friendly'}</p><a className="cut-button dark" href="https://www.google.com/maps/search/?api=1&query=NAS+Specialty+Coffee+15+May+City+Cairo" target="_blank" rel="noreferrer">{arabic ? 'افتح الخريطة' : 'Open map'}</a></div><div className="visit-note"><span>NAS <i /> ناس</span><p>{t.sub}</p><a href="https://www.instagram.com/nas_coffee_/" target="_blank" rel="noreferrer">{t.instagram} ↗</a></div></section></main><footer><Logo dark /><span>{t.location}</span><span>{t.from}</span><a href="https://www.instagram.com/nas_coffee_/" target="_blank" rel="noreferrer">Instagram</a></footer><section className="hidden-menu" id="full-menu"><div className="section menu-page"><div className="section-heading"><span>05</span><h2>{arabic ? 'المنيو' : 'Menu'}</h2><b>{arabic ? 'اختار براحتك' : 'Take your pick'}</b></div><label className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder={arabic ? 'دور على حاجة...' : 'Search the menu...'} /></label><div className="menu-grid">{filtered.map(item => <MenuCard item={item} key={item[0]} />)}</div></div></section></div>
}

