import React from 'react';
import pageNotFound  from '../assets/images/pageNotFound.svg';

export default function NotFound() {

    return (
        <div className="p-25 pageNotFound">
            <img src={pageNotFound} alt="Page not found" width="50%"/>
        </div>
    );
}