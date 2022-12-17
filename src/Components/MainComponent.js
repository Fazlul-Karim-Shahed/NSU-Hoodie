import React from 'react'
import Admin from './Admin/Admin'
import Form from './Client/Form'
import { Routes, Route } from 'react-router'

export default function MainComponent() {


    let general =
        <Route path='/' element={<Form />}>
        </Route>

    let admin =
        <Route path={'/admin/' + process.env.REACT_APP_ADMIN_PASS} element={<Admin />}>
        </Route>

    return (
        <div>
            <Routes>
                {general}
                {admin}
                <Route path='*' element={<h1 className='text-center p-5'>Page not found</h1>} />
            </Routes>
        </div>
    )
}
