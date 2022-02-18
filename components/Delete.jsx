import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';

export default function Delete(props) {
  const router = useRouter();
  async function deleteMovie(id) {
    try {
      await fetch(`http://localhost:3000/api/${id}`, {
        method: 'DELETE',
      });
      await router.push('/');
      toast('Movies/Series Removed!', {
        icon: '🗑️',
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <span
      className='absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer'
      onClick={() => deleteMovie(props.id)}
    >
      <MdClose className='text-xl text-gray-600 hover:text-gray-800' />
    </span>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/${context.params.id}`);
  const data = await res.json();
  return { props: { ...data } };
}
