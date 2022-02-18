const saveMovie = async (e) => {
  e.preventDefault();
  setMovies([...movies, formData]);
  const res = await fetch('/api/movie', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  return await res.json();
};

// {movies.map((item) => (
//   <li
//     className='flex justify-start max-w-xl px-4 py-4 bg-white shadow-md rounded-lg relative'
//     key={item.id}
//   >
//     <section className='py-2 flex flex-col items-center justify-between'>
//       <div className='leading-snug flex flex-col'>
//         {/* <Delete id={item.id} /> */}
//         <span>
//           <strong>{item.title}</strong>
//         </span>
//         <span>
//           <em>Release date:</em> {item.year}
//         </span>
//         <span>{item.description}</span>
//         <Link href={`/movies/${item.slug}`}>
//           <a className='text-blue-500'>More about this movie</a>
//         </Link>
//       </div>
//     </section>
//   </li>
// ))}
