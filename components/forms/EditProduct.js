import React,{useState} from 'react'

const EditProductForm = ({productValues}) => {

    const [loading,setLoading]=useState(false);

    const handleSubmit=()=>{

    }

    const handleChange=(e)=>{

    }

    const handleImage=()=>{
      
    }
 
  return (
    <>
     
    {productValues && (
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <h5>Title</h5>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Product Title - e.g Strawberry Cake / Dogwalking 1 hour"
            value={productValues.name}
            onChange={handleChange}
          />
        </div>

        <br />


        <div className='container'>
          <h5>Description</h5>
          <textarea
            name="description"
            placeholder="Description"
            cols="7"
            rows="7"
            value={productValues.description}
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>

        <br />
       

        <br />
   <div className='container'>
          <h5>Select Product Type</h5>


          <select
            style={{ width: "100%" }}
            size="large"
            value={productValues.type}
            onChange={(v) => {



              setValues({ ...values, mainLocation: v })
            }}
          >
        
              <option value={'product'}  >Product</option>
              <option value={'service'}  >Service</option>
         

          </select>


        </div>

      

        <div className='container'>
          <h5>Upload Product Images</h5>
          <label className="btn btn-outline-secondary btn-block text-left">
          
            <input
              type="file"
              name="image"
              multiple
              onChange={handleImage}
              accept="image/*"
              hidden
            />
          </label>
       
        </div>


        <br />
        <div>
          <button
            onClick={handleSubmit}
           
            className="btn btn-primary"
   
            type="primary"
            size="large"
            shape="round"
          >
       
          </button>
        </div>


      </form>
    )}
  </>
  )
}

export default EditProductForm