import React, { Component } from 'react'
// import PropTypes from 'prop-types'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>{source}</span>
                    <img src={imageUrl ? imageUrl : "https://images.unsplash.com/photo-1614028674490-d12fd4eaa168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&height=600&q=80"} className="card-img-top" alt="newsImage" />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div >
        )
    }
}

export default NewsItem
