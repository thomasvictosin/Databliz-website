import React from 'react'

const ContactForm = () => {
  return (
    <>
      <form action="/contact" method="POST" className='flex flex-col gap-6 w-full'>
            <input type="text" name="name" placeholder='Name' className='w-full border-1 border-gray-300 rounded-lg p-2 placeholder:text-gray-600 placeholder:font-light placeholder:text-opacity-50 placeholder:text-sm text-gray-600' />
            <input type="email" name="email" placeholder='Email' className='w-full border-1 border-gray-300 rounded-lg p-2 placeholder:text-gray-600 placeholder:font-light placeholder:text-opacity-50 placeholder:text-sm text-gray-600' />
            <textarea name="message" placeholder='Message' className='w-full border-1 border-gray-300 rounded-lg p-2 placeholder:text-gray-600 placeholder:font-light placeholder:text-opacity-50 placeholder:text-sm text-gray-600' />
            <button type="submit" className='bg-[#3E4095] text-white px-6 py-3 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-[#3176B1] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#3176B1]'>Submit</button>
      </form>
    </>
  )
}

export default ContactForm
