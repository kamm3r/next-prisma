import Form from './Form';

export default function Edit() {
  return (
    <div className='absolute top-0 '>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center'>
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        <Form />
      </div>
    </div>
  );
}
