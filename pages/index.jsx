import "../styles.scss"
import Head from 'next/head'

export default () => {
    const imgStyle = {width: "128px", height: "128px"};
    const divStyle = {
        color: 'white',
        backgroundColor: "#f4f4f4",
        WebkitTransition: 'all', // note the capital 'W' here
        msTransition: 'all' // 'ms' is the only lowercase vendor prefix
      };
    return ( <div className="example">
    <Head>
      <title>example next.js</title>
      </Head>
        <img src="static/images/loginr_key.png" alt=""  style={{width: "128px", height: "128px"}} />
    <p style={divStyle}>Welcome to next.js!</p>
    </div>
    );
}
