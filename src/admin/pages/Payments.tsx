import React, { useMemo, useState } from 'react';
import { Button, Tabs } from 'antd';
import { InboxOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export default function Payments() {
  
  type PositionType = 'left';

    const [position] = useState<PositionType[]>(['left']);

    const OperationsSlot: Record<PositionType, React.ReactNode> = {
        left: <Button className="h-12 w-40 mb-4 bg-[#1890FF] primary-6 text-white">Add Payment</Button>,
    };
    

    const slot = useMemo(() => {
        if (position.length === 0) return null;

        return position.reduce(
            (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
            {},
        );
    }, [position]);

    const [activeTab, setActiveTab] = useState<string>('1');

    const handleTabChange = (key: string) => {
        // Do something based on the selected tab key
        console.log(`Tab changed to: ${key}`);
        setActiveTab(key);
        console.log(activeTab);
    };

  return (
    <>
      <Tabs
        className='flex flex-1'
        defaultActiveKey="1"
        tabPosition="left"
        tabBarExtraContent={slot}
        onChange={handleTabChange}
      >
        <TabPane tab={<span><InboxOutlined />Pending</span>} key="1" />
        <TabPane tab={<span><CheckCircleOutlined />Completed</span>} key="2" />
        <TabPane tab={<span><ClockCircleOutlined />All</span>} key="3" />
      </Tabs>
    </>
  )
}
