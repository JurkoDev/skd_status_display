
import React from 'react';
import { DataType } from './websocket';

export default function FancyList({ data }: { data: DataType }) {
    return (
        <div className="flex justify-between space-x-6 mt-2">
            <div className="relative w-full">
                {data.map((item) => (
                    <div key={item.id} className={`flex items-center rounded-tremor-small h-9 bg-${item.color}-100 mb-2`} style={{ transition: "all 1s ease 0s" }}>
                        <div className="absolute max-w-full flex left-2">
                            <p className="whitespace-nowrap truncate text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">{item.name + " " + item.trieda}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-right min-w-min">
                {data.map((item) => (
                    <div key={item.id} className="flex justify-end items-center h-9 mb-2">
                        <p className="whitespace-nowrap truncate text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
