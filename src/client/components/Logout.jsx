import React from 'react'

const Logout = () => {
  return (
    <>
      <Link to="/">
        <button
          className="mt-8 text-gray-600 hover:text-black"
          onClick={() => alert("Logged Out!")}
        >
          ⏻ Logout
        </button>
      </Link>
    </>
  );
}

export default Logout
