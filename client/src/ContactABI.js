const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_blogId",
          "type": "string"
        }
      ],
      "name": "approveBlog",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_blogId",
          "type": "string"
        }
      ],
      "name": "deleteBlog",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "blogs",
      "outputs": [
        {
          "internalType": "string",
          "name": "blogId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "authorName",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isApproved",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isDeleted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nextBlogId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  
  
  export default contractABI;