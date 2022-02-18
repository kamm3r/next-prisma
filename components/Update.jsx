import Router from 'next/router';
import toast from 'react-hot-toast';

export default function Update(props) {
  const UpdateMovie = async (id) => {
    try {
      await fetch(`/api/update/${id}`, {
        method: 'PUT',
      });
      await Router.push('/');
      toast('Movies/Series Update!', {
        icon: '🔃',
      });
    } catch (error) {
      console.log(error);
      return toast.error("Couldn't Update");
    }
  };
  return (
    <div className='fixed z-[1000] h-screen w-screen top-0 left-0 bg-black/70 flex justify-center items-center'>
      <form className=' mt-8 flex flex-wrap gap-5'>
        <div className='relative w-full'>
          <input
            className='form-inputs peer'
            type='text'
            name='title'
            placeholder='Title'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <label className='form-label' htmlFor='title'>
            Title
          </label>
        </div>
        <div className='relative flex-[3]'>
          <input
            className='form-inputs peer'
            type='text'
            name='slug'
            placeholder='Slug'
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
          <label className='form-label' htmlFor='slug'>
            Slug
          </label>
        </div>
        <div className='relative flex-1'>
          <input
            className='form-inputs peer'
            type='text'
            name='year'
            placeholder='Year'
            onChange={(e) =>
              setFormData({ ...formData, year: +e.target.value })
            }
            required
          />
          <label className='form-label' htmlFor='year'>
            Year
          </label>
        </div>
        <div className='relative w-full'>
          <textarea
            className='form-textarea peer'
            name='description'
            placeholder='Description'
            id=''
            cols='30'
            rows='8'
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <label className='form-label' htmlFor='description'>
            Description
          </label>
        </div>
        <button className='form-button' type='submit'>
          Add movie
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/${context.params.id}`);
  const data = await res.json();
  return { props: { ...data } };
}
