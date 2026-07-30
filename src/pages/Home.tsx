import { useState } from 'react'
import useEstimate from '../hooks/useEstimate';
import Loading from "../components/loading";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [inputForm, setInputForm] = useState({
    zip: "",
    sqft: "",
    numOfBeds: "",
    numOfBaths: "",
    desiredFinishes: ""
  });

  const { data, loading, err, fetchEstimate } = useEstimate();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const estimate = await fetchEstimate(inputForm);
    navigate("/response", { state: estimate });
  }

  if (loading) return <Loading />;

  return (
    <>
      <section id="center">
        <h1>AI Home Builder Estimator</h1>
        <form onSubmit={handleSubmit} className="form-fields flex flex-col items-center max-w-['80%'] mx-auto mb-4 gap-4">
          <div className="flex flex-col items-start mx-auto gap-2 w-[50%]">
            <span className="label text">ZIP Code</span>
            <input type="text" className="input w-full" value={inputForm.zip} onChange={(e) => setInputForm({ ...inputForm, zip: e.target.value })} />
          </div>
          <div className="flex flex-col items-start mx-auto gap-2 w-[50%]">
            <span className="label text">SQFT</span>
            <input type="text" className="input w-full" value={inputForm.sqft} onChange={(e) => setInputForm({ ...inputForm, sqft: e.target.value })} />
          </div>
          <div className="flex flex-col items-start mx-auto gap-2 w-[50%]">
            <span className="label text">Number of Beds</span>
            <input type="number" className="input w-full" value={inputForm.numOfBeds} onChange={(e) => setInputForm({ ...inputForm, numOfBeds: e.target.value })} />
          </div>
          <div className="flex flex-col items-start mx-auto gap-2 w-[50%]">
            <span className="label text">Number of Baths</span>
            <input type='number' className="input w-full" value={inputForm.numOfBaths} onChange={(e) => setInputForm({ ...inputForm, numOfBaths: e.target.value })} />
          </div>
          <div className="flex flex-col items-start mx-auto gap-2 w-[50%]">
            <span className="label text">Desired Finishes</span>
            <select onChange={(e) => setInputForm({ ...inputForm, desiredFinishes: e.target.value })} value={inputForm.desiredFinishes} className='select w-full'>
              <option value='' disabled>Select a Finish</option>
              <option value='basic'>Basic</option>
              <option value='standard'>Standard</option>
              <option value='luxury'>Luxury</option>
            </select>
          </div>
          <button type='submit' className="btn btn-accent w-30">Submit</button>
        </form>
      </section>
    </>
  )
}
