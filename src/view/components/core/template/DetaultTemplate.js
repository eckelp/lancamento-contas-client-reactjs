import {Layout} from "antd";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";


const DefaultTemplate = ({children}) => {

    return (
        <Layout className="layout">
            <Header/>
            <Body>
                {children}
            </Body>
            <Footer/>
        </Layout>
    );
}

export default DefaultTemplate;
