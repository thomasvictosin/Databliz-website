"use client";
import React, { useState } from 'react'

const ContactBody = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'|'invalid'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg(null)

    if (!validateEmail(email)) {
      setStatus('invalid')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, honeypot }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        const body = await res.json().catch(() => ({}))
        setErrorMsg(body?.error || 'Something went wrong')
        setStatus('error')
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Network error')
      setStatus('error')
    }
  }

  return (
    <div className="w-full px-8 flex justify-between items-stretch py-12 gap-24 mx-auto flex-col md:flex-row">
      <div className='w-full md:w-1/2 flex-1 gap-6 rounded-lg p-6 flex flex-col justify-center items-start shadow-lg shadow-blue-500/20'>
        <h1 className='text-3xl md:text-5xl font-bold text-[#3E4095] mb-3'>Get In Touch</h1>
        <p className='text-gray-600 text-sm sm:text-xs'>We are here to help you with any questions or concerns you may have. Our team is dedicated to providing you with the best possible service and support. Please feel free to reach out to us using the contact information below or by filling out the contact form.</p>
        <div className='flex flex-col gap-4'>
            <p className='text-gray-600 text-sm'>Email: <a href="mailto:info@databliz.com" className='text-[#3E4095] hover:underline'>info@databliz.com</a></p>
            <p className='text-gray-600 text-sm'>Phone: <a href="tel:+1234567890" className='text-[#3E4095] hover:underline'>+1 (234) 567-890</a></p>
        </div>
      </div>
      <div className='w-full md:w-1/2 flex-1 gap-4 rounded-lg p-6 flex flex-col justify-center items-start shadow-lg shadow-blue-500/20'>
        <p className='text-gray-600 text-md'>We would love to hear from you! Please fill out the form and we will get back to you as soon as possible.</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full text-gray-600' aria-live="polite">
            <label htmlFor="name" className="sr-only">Name</label>
            <input id="name" value={name} onChange={e => setName(e.target.value)} type="text" name="name" placeholder='Name' className='w-full border-1 border-gray-300 rounded-lg p-2 placeholder:text-gray-600 placeholder:font-light placeholder:text-opacity-50 placeholder:text-sm text-gray-600' />

            {/* Honeypot - hidden field to catch bots (kept out of tab order) */}
            <input
              id="honeypot"
              name="honeypot"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px' }}
            />

            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder='Email' className='w-full border-1 border-gray-300 rounded-lg p-2 placeholder:text-gray-600 placeholder:font-light placeholder:text-opacity-50 placeholder:text-sm text-gray-600' />

            <label htmlFor="message" className="sr-only">Message</label>
            <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} name="message" placeholder='Message' rows={6} className='w-full border-1 border-gray-300 rounded-lg p-2 placeholder:text-gray-600 placeholder:font-light placeholder:text-opacity-50 placeholder:text-sm text-gray-600' />

            <div className="min-h-[36px]">
              {status === 'loading' && (
                <div className="inline-block px-3 py-2 bg-yellow-100 text-yellow-800 rounded-md">Sending…</div>
              )}
              {status === 'success' && (
                <div className="inline-block px-3 py-2 bg-green-100 text-green-800 rounded-md">Message sent successfully.</div>
              )}
              {status === 'invalid' && (
                <div className="inline-block px-3 py-2 bg-red-100 text-red-800 rounded-md">Please enter a valid email.</div>
              )}
              {status === 'error' && (
                <div className="inline-block px-3 py-2 bg-red-100 text-red-800 rounded-md">{errorMsg || 'Failed to send message.'}</div>
              )}
            </div>

            <button type="submit" disabled={status === 'loading'} className='bg-[#3E4095] text-white px-6 py-3 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-[#3176B1] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#3176B1] disabled:opacity-50'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ContactBody
