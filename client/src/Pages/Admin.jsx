import { useEffect, useState } from "react";
import contractABI from "../ContactABI";
import axios from "axios";
import Web3 from "web3";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
let web3 = new Web3(window.ethereum);
let contract = new web3.eth.Contract(contractABI, contractAddress);

export default function Admin() {
  const [Blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/getAdminBlogs"
      );
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleApproval = async (id) => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        alert("Please connect to MetaMask");
        return;
      }

      // Use send() instead of call() for state-changing transactions
      const result = await contract.methods
        .approveBlog(id)
        .send({ from: accounts[0] }); // Use accounts[0] instead of the whole accounts array

      console.log("Transaction result:", result);

      // Refresh the blogs list after successful approval
      fetchBlogs();
    } catch (error) {
      console.error("Error approving blog:", error);
      alert("Error approving blog. Check console for details.");
    }
  };
  async function connectWallet() {
    if (window.ethereum) {
      const account = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error.
            // If this happens, the user rejected the connection request.
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
      fetchBlogs();
      console.log(account);
    } else {
      console.error("No web3 provider detected");
      document.getElementById("connectMessage").innerText =
        "No web3 provider detected. Please install MetaMask.";
    }
  }
  return (
    <>
      <button
        onClick={() => {
          connectWallet();
        }}
      >
        Connect to metamask
      </button>
      <div>
        {Blogs.length > 0 &&
          Blogs.map((blog) => (
            <div key={blog._id}>
              <h1>{blog.title}</h1>
              <h3>{blog.author}</h3>
              <p>{blog.description}</p>
              <button
                onClick={() => {
                  handleApproval(blog._id);
                }}
              >
                Approve
              </button>
              <button>Delete</button>
            </div>
          ))}
      </div>
    </>
  );
}
