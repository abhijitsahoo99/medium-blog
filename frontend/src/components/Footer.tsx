const items = ['Help', 'Status', 'About', 'Careers', 'Press', 'Blog', 'Privacy', 'Terms', 'Text to Speech', 'Teams']

const Footer = () => {
  return (
    <div className='flex gap-6 justify-center font-extralight text-sm border-t-2 py-4 bg-white'>
        {items.map((item, index) => {
            return <span className='hover:font-normal cursor-pointer' key={index}>{item}</span>
        })}
    </div>
  )
}

export default Footer