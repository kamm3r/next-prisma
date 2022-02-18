import { Toaster } from 'react-hot-toast';

export default function Form({ setFormData, formData, submitHandler }) {
  return (
    <form className='mt-8 flex flex-wrap gap-5' onSubmit={submitHandler}>
      <div className='relative w-full'>
        <input
          className='form-inputs peer'
          type='text'
          name='title'
          placeholder='Title'
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, year: +e.target.value })}
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
      <Toaster />
    </form>
  );
}
