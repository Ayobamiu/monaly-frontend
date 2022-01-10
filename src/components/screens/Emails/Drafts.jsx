/** @format */

import React from "react";
import { List } from "antd";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

export default function Drafts() {
  return (
    <div className='container my-5'>
      <p className='header-p'>Drafts</p>
      <List
        itemLayout='vertical'
        size='large'
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={listData}
        renderItem={(item) => (
          <div className='preview-box my-3'>
            <div className='d-flex justify-content-between align-items-start'>
              <p className='text-large'>{item.title}</p>
              <NavLink to='/admin/compose-email'>
                <div className='avatar sm bg-light cursor'>
                  <FontAwesomeIcon icon={faPen} className='text-secondary' />
                </div>
              </NavLink>
            </div>
            <p className='text-small'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Molestiae ratione eos excepturi iusto odio. Culpa repudiandae
              iusto, vel aperiam iure aspernatur corrupti dignissimos, molestiae
              impedit eveniet reiciendis voluptatem optio beatae?
            </p>
          </div>
        )}
      />
      <div className='mb-5'>&nbsp;</div>
    </div>
  );
}
