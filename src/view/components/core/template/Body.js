import {Layout} from "antd";
import React from "react";


const Body = ({children}) => {
    return (
        <Layout.Content style={{padding: '0 50px', marginTop: '50px'}}>
            <div className="site-layout-content">
                {children}
            </div>
        </Layout.Content>
    );
}

export default Body;
