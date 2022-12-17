import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'

export default function Admin() {

  const [orders, setOrders] = useState([])
  useEffect(() => {

    axios.get('https://nsu-hoodie-default-rtdb.asia-southeast1.firebasedatabase.app/.json')
      .then(data => {
        console.log(data.data);
        let od = []
        for (let i in data.data) {
          let obj = {
            ...data.data[i],
            position: i
          }

          od.push(obj)
        }
        setOrders([...od])

      })

  }, [])

  const cancel = position => {
    if (window.confirm('Want to delete?')) {
      axios.delete("https://nsu-hoodie-default-rtdb.asia-southeast1.firebasedatabase.app/" + position + '.json')
        .then(data => {
          axios.get('https://nsu-hoodie-default-rtdb.asia-southeast1.firebasedatabase.app/.json')
            .then(data => {
              console.log(data.data);
              let od = []
              for (let i in data.data) {
                let obj = {
                  ...data.data[i],
                  position: i
                }

                od.push(obj)
              }
              setOrders([...od])

            })

        })
    }
  }

  const done = item => {
    console.log('item: ', item);
    axios.put("https://nsu-hoodie-default-rtdb.asia-southeast1.firebasedatabase.app/" + item.position + '.json', {
      ...item,
      status: 'complete'
    })
      .then(data => {
        console.log(data.data);
        axios.get('https://nsu-hoodie-default-rtdb.asia-southeast1.firebasedatabase.app/.json')
          .then(data => {
            console.log(data.data);
            let od = []
            for (let i in data.data) {
              let obj = {
                ...data.data[i],
                position: i
              }

              od.push(obj)
            }
            setOrders([...od])

          })
      })
  }

  console.log(orders);

  let orderShow = orders.map((item, index) => {
    return (
      <tr className='text-center'>
        <th className='border' scope="row">{index + 1}</th>
        <td className='border'>{item.firstName + " " + item.lastName}</td>
        <td className='border'>{item.email}</td>
        <td className='border'>{item.phone}</td>
        <td className='border'>{item.transactionId}</td>
        <td className='border'>{item.product1_size}</td>
        <td className='border'>{item.product1_Quantity}</td>
        <td className='border'>{item.firstPayment}</td>
        <td className='border'>{item.secondPayment}</td>
        <td className='border'>{item.price}</td>
        <td className='border'>{item.paymentMethod}</td>
        <td className='border'>{item.orderTime}</td>
        <td className='border'>{item.comment}</td>
        <td className='border'>{item.status}</td>
        <td className='border'>
          <button onClick={e => done(item)} className='btn btn-success btn-sm my-1'>Done</button> <br />
          <button onClick={e => cancel(item.position)} className='btn btn-danger btn-sm'>Cancel</button>
        </td>
      </tr>
    )
  })

  return (
    <div className='bg-light px-1'>
      <h3 className='text-center p-5'>Order Details</h3>
      <Table responsive>
        <thead>
          <tr className='text-center'>
            <th>Serial</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Transaction Id</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>First payment</th>
            <th>Second payment</th>
            <th>Total</th>
            <th>Method</th>
            <th>Order time</th>
            <th>Comment</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{orderShow}</tbody>
      </Table>
    </div>
  )
}
