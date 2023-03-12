import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        name: 'in',
        pageSize: 8
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string
    }

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            articles: [],
            loading: false,
            totalResults: 0
        }

        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7531fcc04fc2428e92725eac12bae5f7&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true })

        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json();
        this.props.setProgress(70)
        this.setState({
            loading: false,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({
            page: this.state.page - 1
        })
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1
        })
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 }, async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`

            let data = await fetch(url)
            let parsedData = await data.json()
            this.setState({
                loading: false,
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            })
        })
    }


    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalize(this.props.category)} Headings</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length != this.state.totalResults}
                    loader={<Spinner />}>

                    <div className="containier" style={{ width: '90%', margin: 'auto' }}>
                        <div className="row" >
                            {this.state.articles && this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 5)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
