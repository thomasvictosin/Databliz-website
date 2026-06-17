import React from 'react'

const ContactBody = () => {
  return (
    <div className="w-full px-8 flex justify-between items-stretch py-12 gap-24 mx-auto flex-col md:flex-row">
      <div className='w-full md:w-1/4 flex-1 gap-6 rounded-lg p-6 flex flex-col justify-center items-start shadow-lg shadow-blue-500/20'>
        <h1 className='text-3xl md:text-5xl font-bold text-[#3E4095] mb-3'> Get in Touch</h1>
        <p className='text-gray-600 text-sm'>We are here to help you with any questions or concerns you may have. Our team is dedicated to providing you with the best possible service and support. Please feel free to reach out to us using the contact information below or by filling out the contact form.</p>
        <div className='flex flex-col gap-4'>
            <p className='text-gray-600 text-sm'>Email: <a href="mailto:info@databliz.com" className='text-[#3E4095] hover:underline'>info@databliz.com</a></p>
            <p className='text-gray-600 text-sm'>Phone: <a href="tel:+1234567890" className='text-[#3E4095] hover:underline'>+1 (234) 567-890</a></p>

        </div>
      </div>
      <div className='w-full md:w-1/4 flex-1 gap-4 rounded-lg p-6 flex flex-col justify-center items-start shadow-lg shadow-blue-500/20'>
        <p className='text-gray-600 text-sm'>We would love to hear from you! Please fill out the form and we will get back to you as soon as possible.</p>
        <form action="/contact" method="POST" className='flex flex-col gap-6 w-full'>
            <input type="text" name="name" placeholder='Name' className='w-full border-1 border-gray-300 rounded-lg p-2 placeholder:text-gray-600' />
            <input type="email" name="email" placeholder='Email' className='w-full border-1 border-gray-300 rounded-lg p-2 placeholder:text-gray-600' />
            <textarea name="message" placeholder='Message' className='w-full border-1 border-gray-300 rounded-lg p-2 placeholder:text-gray-600' />
            <button type="submit" className='bg-[#3E4095] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-blue-600 hover:-translate-y-0.5'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ContactBody
