import React from "react";
import Layout from "../../components/Layout/Layout";


import CategorySelect from '../../components/CategorySelect/CategorySelect';

function SelectCategoryPage() {
    const userId = window.localStorage.getItem("userid");
    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>
             <CategorySelect addfreshbtn="addfreshbtn"/>
        </Layout>
    );
}

export default SelectCategoryPage;