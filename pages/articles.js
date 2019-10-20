import Link from 'next/link'
import { AdminLayout } from 'shared/layouts'
import { Loader } from 'shared/components/Common'
import _JSXStyle from 'styled-jsx/style'

import Folder from 'react-icons/lib/fa/folder';
import FolderOpened from 'react-icons/lib/fa/folder-open';

import { gfArticleStore } from 'goldfish'
import { getMonthBefore } from 'shared/utils/dateHelpers';
import { sortedByDate } from 'shared/utils/sortHelpers';

import styles from 'shared/components/Admin/Article/style/articles-style';

const mapState = ({ articleStore: { getArticleList, articles, articleState } }) => ({
  getArticleList,
  articles,
  articleState,
})

@inject(mapState)
export default class AdminArticles extends React.Component {
  constructor(props) {
    super(props);

    props.getArticleList(undefined, gfArticleStore.adminFetchFields);

    this.state = {
      opens: [],
    };
  }

  getSortedArticles = () => {
    const { articles } = this.props;

    return sortedByDate(articles, true);
  }

  handleOpen = key => () => {
    const { opens } = this.state;

    this.setState({
      opens: opens.includes(key) ?
        opens.filter(item => item !== key) :
        [...opens, key],
    });
  }

  render() {
    const { opens } = this.state;
    const { articleState } = this.props;
    const articles = this.getSortedArticles();

    return (
      <AdminLayout className="container">
        <div className="admin-articles">
          <h1>ARTICLES</h1>

          {articleState === 'pending' && <Loader />}

          <div className="list">
            {Object.entries(articles).map(([key, value]) => {
              const isOpen = opens.includes(key);
              return (
                <div className="item-wrapper" key={key}>
                <span className="article-date" onClick={this.handleOpen(key)}>
                  {isOpen ? <FolderOpened /> : <Folder />}
                  <span>{key}</span>
                </span>
                  <div className="item-wrapper__list">
                    {isOpen &&
                      value.map(({ _id, name, createdAt, category }) => {
                        return (
                          <Link href={`/article-view?id=${_id}`} key={_id}>
                            <a className="article-link">
                              <strong>{category.toUpperCase()}</strong>
                              <span>{name}</span>
                              <span>{createdAt}</span>
                            </a>
                          </Link>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })}
          </div>

          <style jsx>{styles}</style>
        </div>
      </AdminLayout>
    );
  }
}