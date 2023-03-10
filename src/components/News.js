import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    static defaultProps = {
        name: 'in',
        pageSize: 8
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            page: 1,
            articles: [],
            loading: false
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7531fcc04fc2428e92725eac12bae5f7&page=1&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true })

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            loading: false,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        })
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7531fcc04fc2428e92725eac12bae5f7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true })

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            loading: false,
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7531fcc04fc2428e92725eac12bae5f7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

            this.setState({ loading: true })

            let data = await fetch(url)
            let parsedData = await data.json();

            this.setState({
                loading: false,
                page: this.state.page + 1,
                articles: parsedData.articles
            })
            { console.log("In handle NExt Click function: ", Math.ceil(this.state.totalResults / this.props.pageSize)) }
        }
    }

    render() {
        let { pageSize } = this.props;
        return (
            <div className="container my-5">
                <h1 className='text-center'>NewsMonkey - Top Headings</h1>
                {this.state.loading && <Spinner />}
                <div className="row my-3" >
                    {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 85) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 5)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    {console.log(Math.ceil(this.state.totalResults / pageSize))}
                </div>
            </div>
        )
    }
}

export default News
