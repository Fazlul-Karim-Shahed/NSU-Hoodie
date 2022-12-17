import React, { useState, useRef } from 'react'
import { Formik } from 'formik'
import emailjs from '@emailjs/browser';
import './Form.css'
import { Card, CardBody, Modal, ModalBody, ModalHeader, ModalFooter, Button, Spinner, Alert } from 'reactstrap'
import axios from 'axios';

export default function Form() {

    const form = useRef()
    const [open, setOpen] = useState(false)
    const [productModal, setProductModal] = useState(false)
    const [selected, setSelected] = useState('front')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ data: '', weight: '' })
    const toggle = () => setOpen(!open)
    const selectToggle = () => setProductModal(!productModal)


    const submit = (val, price, firstPayment, secondPayment, transactionId, paymentMethod) => {

        // console.log({
        //     ...val,
        //     orderTime: new Date().toLocaleString(),
        //     price: Number(price),
        //     firstPayment: firstPayment,
        //     secondPayment: secondPayment,
        //     status: 'pending',
        //     paymentMethod: paymentMethod
        // })

        if (transactionId === '' || paymentMethod === '') {
            setLoading(false)
            setMessage({ data: 'Please select payment method and give your transaction id.', weight: 'fail' })

        } else {

            setLoading(true)
            axios.post('https://nsu-hoodie-default-rtdb.asia-southeast1.firebasedatabase.app/.json', {
                ...val,
                orderTime: new Date().toLocaleString(),
                price: Number(price),
                firstPayment: firstPayment,
                secondPayment: secondPayment,
                status: 'pending',
                paymentMethod: paymentMethod

            }).then(data => {
                // console.log(data.data)
                setMessage({ data: 'Order received successfully. Email sending...', weight: 'success' })
                emailjs.sendForm('service_mhbw5je', 'template_n94c28v', form.current, 'm5YmCocmFVzqfZ7dk')
                    .then((result) => {
                        // console.log(result);
                        setLoading(false)
                        if (result.text === 'OK') {
                            setMessage({ data: 'Order received successfully. Email sent', weight: 'success' })
                        }
                        else {
                            setMessage({ data: 'Something went wrong', weight: 'fail' })
                        }
                    }, (error) => {
                        setLoading(false)
                        setMessage({ data: error.text, weight: 'fail' }) // Edit it
                        // setMessage({ data: 'Order received. But email not sent', weight: 'fail' }) // Edit it
                    });
            })
                .catch(err => {
                    setLoading(false)
                    setMessage({ data: err.message, weight: 'fail' })
                })

        }



    }

    return (
        <div className='total'>
            <div className="container border">
                <div className='py-3 text-center'>
                    <img className='img-fluid' src="/Assets/Banner.gif" alt="" srcset="" />
                </div>
                <div className="form bg-light p-4">
                    <div>
                        <Formik

                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                phone: '',
                                product1_size: '',
                                product1_Quantity: 0,
                                comment: '',
                                transactionId: '',
                                paymentMethod: ''


                            }}

                            onSubmit={val => {
                                // console.log(val)
                                toggle()
                            }}


                        >

                            {({ values, handleChange, handleSubmit }) => (
                                <form ref={form} onSubmit={handleSubmit} action="">

                                    <h4 className='text-center mt-3 mb-5'>Product Info</h4>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Card>
                                                <CardBody>
                                                    <div style={{ cursor: 'pointer' }} onClick={e => { setSelected('front'); selectToggle() }} className='text-center mb-4' htmlFor="product1">
                                                        <img className='img-fluid w-50' src="/Assets/front.png" alt="" />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                        <div className="col-md-6 mt-4 mt-md-0">
                                            <Card>
                                                <CardBody>
                                                    <div style={{ cursor: 'pointer' }} onClick={e => { setSelected('back'); selectToggle() }} className='text-center mb-4' htmlFor="product1">
                                                        <img className='img-fluid w-50' src="/Assets/back.png" alt="" />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                        <div className='border mt-4 rounded p-3'>
                                            <p className='fw-bold'>Product Quality: </p>
                                            <ol>
                                                <li>100% premium woolen cotton fabric. </li>
                                                <li>Fabric quality - 320+ GSM. </li>
                                                <li>Print type - High quality DTF print. </li>
                                            </ol>
                                        </div>

                                        <div className="row border m-0 mt-4 rounded">

                                            <div className="col-md-6">
                                                <div className='my-3'>

                                                    <strong className=''>Size</strong>
                                                    <select required onChange={handleChange} value={values.product1_size} name="product1_size" className='form-control my-3' id="">
                                                        <option value=''>Select</option>
                                                        <option value="S- length 26 inch, chest 36 inch">S- length 26 inch, chest 36 inch</option>
                                                        <option value="M- length 27 inch, chest 38 inch">M- length 27 inch, chest 38 inch</option>
                                                        <option value="L-  length  28 inch,  chest 40 inch">L-  length  28 inch,  chest 40 inch</option>
                                                        <option value="XL- length  29 inch,  chest 42 inch">XL- length  29 inch,  chest 42 inch</option>
                                                        <option value="XXL- length  30 inch,  chest 44 inch">XXL- length  30 inch,  chest 44 inch</option>
                                                        <option value="3XL- length  31 inch,  chest 46 inch">3XL- length  31 inch,  chest 46 inch</option>
                                                    </select>

                                                    <strong className=''>Quantity</strong>
                                                    <select required onChange={handleChange} value={values.product1_Quantity} name="product1_Quantity" className='form-control my-3' id="">
                                                        <option value=''>Select</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>


                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className='bg-warning text-dark my-4 p-3 rounded'>
                                                    <h5>Pricing: </h5>
                                                    <p>Size: {values.product1_size}</p>
                                                    <p>First Payment:  {610 * (values.product1_Quantity === '' ? 0 : Number(values.product1_Quantity))} ৳</p>
                                                    <p>Second Payment (cash on) : {389 * (values.product1_Quantity === '' ? 0 : Number(values.product1_Quantity))} ৳</p>
                                                    <p>Total: {999 * (values.product1_Quantity === '' ? 0 : Number(values.product1_Quantity))} ৳</p>
                                                </div>
                                            </div>

                                            <div className='mb-4'>
                                                <p className='text-primary'>NOTE:</p>
                                                1. Price <span className='fw-bold'>999 BDT</span>. <br />
                                                2. You have to complete the <span className='fw-bold'>First payment</span> first (610 ৳). (You can also pay the total amount at a time) <br />
                                                3. You will pay 610 ৳ by Bkash or Nagad. The rest amount can be paid on cash when you received the product. <br />
                                                4. If any exception, you can write down in the comment section (which appear after click the continue button) <br />
                                                5. You will receive your product at NSU Campus. <br />
                                                6. For any query: <span className='fw-bold'>+8801312379588</span> or <span className='fw-bold'>fazlul.shahed2000@gmail.com</span>
                                            </div>

                                        </div>

                                    </div>



                                    <h4 className=' mt-5 mb-4 text-center'>Personal Info</h4>
                                    <h6 className='text-danger py-3'>Please give the information accurately. Any kind of mistake is entirely your responsibility.</h6>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <strong className=''>First Name:</strong>
                                            <input
                                                required
                                                type="text"
                                                name="firstName"
                                                onChange={handleChange}
                                                value={values.firstName}
                                                className='form-control my-2'
                                                id="firstName" />
                                        </div>
                                        <div className="col-md-6">
                                            <strong className=''>Last Name:</strong>
                                            <input
                                                required
                                                type="text"
                                                name="lastName"
                                                onChange={handleChange}
                                                value={values.lastName}
                                                className='form-control my-2'
                                                id="lastName" />
                                        </div>
                                    </div>

                                    <div className="row py-3">
                                        <div className="col-md-6">
                                            <strong className=''>Email:</strong>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                value={values.email}
                                                className='form-control my-2'
                                                id="email" />
                                        </div>
                                        <div className="col-md-6">
                                            <strong className=''>Phone Number (Bkash/Nagad):</strong>
                                            <input
                                                required
                                                type="text"
                                                name="phone"
                                                onChange={handleChange}
                                                value={values.phone}
                                                className='form-control my-2'
                                                id="phone" />
                                        </div>
                                    </div>


                                    <button type='submit' className='btn btn-success' >Continue</button>

                                    <Modal isOpen={open} toggle={toggle} size='xl'>
                                        <ModalHeader toggle={toggle}>Final Check</ModalHeader>
                                        <ModalBody>
                                            First Name: {values.firstName}, <br />
                                            Last Name: {values.lastName} <br />
                                            Email: {values.email} <br />
                                            Phone: {values.phone} <br />

                                            <strong>Size:</strong> {values.product1_size} <br />
                                            <strong>Quantity:</strong> {values.product1_Quantity} <br />

                                            <div className='text-danger py-3'>
                                                <div><strong>First Payment:</strong>  {610 * (values.product1_Quantity === '' ? 0 : Number(values.product1_Quantity))} ৳</div>
                                                <div><strong>Second Payment (cash on):</strong> {389 * (values.product1_Quantity === '' ? 0 : Number(values.product1_Quantity))} ৳</div>
                                                <div><strong>Total:</strong> {999 * (values.product1_Quantity === '' ? 0 : Number(values.product1_Quantity))} ৳</div>

                                            </div>

                                            <div className='mb-4 text-danger'>
                                                <strong className=''>Payment Method: <span className='fst-italic'>Bkash or Nagad.</span> </strong>
                                                <br />
                                                <strong>Bkash: </strong> 01312379588 (Send money) <br />
                                                <strong>Nagad: </strong> 01312379588 (Send money)


                                            </div>
                                            <div className='mb-2'>
                                                <strong className=''>Select Payment Method</strong> <br />
                                                <label className='my-2' htmlFor="bkash">
                                                    <input
                                                        required
                                                        className='form-check-input'
                                                        type="radio"
                                                        name="paymentMethod"
                                                        id="bkash"
                                                        value='bkash'
                                                        onChange={handleChange} />
                                                    Bkash</label>
                                                <br />
                                                <label htmlFor="nagad">
                                                    <input
                                                        required
                                                        className='form-check-input mb-3'
                                                        type="radio"
                                                        name="paymentMethod"
                                                        id="nagad"
                                                        value='nagad'
                                                        onChange={handleChange} />
                                                    Nagad</label>
                                                <br />
                                                <strong className=''>Transaction ID:</strong>
                                                <input
                                                    required
                                                    type="text"
                                                    name="transactionId"
                                                    onChange={handleChange}
                                                    value={values.transactionId}
                                                    className='form-control my-2'
                                                    id="transactionId" />
                                            </div>

                                            <div>
                                                <textarea
                                                    placeholder='Write if any exception or comment (optional)'
                                                    name="comment"
                                                    onChange={handleChange}
                                                    value={values.comment}
                                                    className='form-control my-2'
                                                />
                                            </div>


                                            <div>
                                                {!loading ?
                                                    <button disabled={values.product1_Quantity === '' || values.product1_size === ''}
                                                        onClick={e => submit(values, 999 * ((values.product1_Quantity === '' ? 0 : Number(values.product1_Quantity))), 610 * (values.product1_Quantity === '' ? 0 : Number(values.product1_Quantity)), 389 * (values.product1_Quantity === '' ? 0 : Number(values.product1_Quantity)), values.transactionId, values.paymentMethod)}
                                                        className='btn btn-success' type="submit">Submit</button> :
                                                    <Button
                                                        color="success"
                                                        disabled
                                                    >
                                                        <Spinner size="sm">
                                                            Loading...
                                                        </Spinner>
                                                        <span>
                                                            {' '}Sending
                                                        </span>
                                                    </Button>}
                                            </div>
                                            {values.product1_Quantity === '' || values.product1_size === '' ? <Alert className='my-3' color='danger'> <strong>Please select quantity or size</strong> </Alert> : ''}
                                            {message.data === '' ? '' :
                                                <div><Alert className='my-3' color={message.weight === 'fail' ? "danger" : 'success'}> <strong>{message.data}</strong> </Alert></div>}
                                        </ModalBody>
                                    </Modal>
                                </form>
                            )}

                        </Formik>
                    </div>
                </div>

                <Modal isOpen={productModal} toggle={selectToggle} size='xl'>
                    <ModalHeader toggle={selectToggle}>{selected === 'front' ? 'Front Side' : 'Back Side'}</ModalHeader>
                    <ModalBody>
                        <img className='img-fluid w-100' src={selected === 'front' ? '/Assets/front.png' : '/Assets/back.png'} alt="" srcset="" />
                    </ModalBody>
                </Modal>


                <div className="footer">
                    <div className="p-3 bg-dark text-center">
                        <strong className="text-light">Copyright © 2022. All right reserved</strong> <br />
                        <strong className="text-light">

                            Created by <a className='text-decoration-none text-warning' href="https://www.facebook.com/profile.php?id=100051561011802" target='blank'>Fazlul Karim</a>

                        </strong>
                    </div>
                </div>
            </div>

        </div>
    )
}
