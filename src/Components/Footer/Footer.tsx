import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import classes from './Footer.module.css'

const Footer = () => {
    return(
    <>
        <Container fluid className={`${classes.footerBlock} fullContainer`}>
            <Row className='text-center'>
                <Col md={12}>
                    <h6>Website by Pavel Zharski 2021</h6>
                </Col>
            </Row>
        </Container>
    </>
    )
}

export default Footer