
import React from 'react';

const stats = [
  { id: 1, name: 'B2B Paid Advertising', value: '40+', description: 'Average time saved per client through automation' },
  { id: 2, name: 'ROI Increase', value: '300%', description: 'Typical return on investment within 6 months' },
  { id: 3, name: 'Automation for CRM Management', value: '85%', description: 'Reduction in manual tasks across implementations' },
  { id: 4, name: 'Client Satisfaction', value: '98%', description: 'Success rate in meeting project objectives' },
];

const Stats = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Proven Results Through Automation
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Our AI-powered solutions deliver measurable impact across every implementation.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-900 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-300">{stat.name}</dt>
                <dd className="order-first text-4xl font-bold tracking-tight text-white">{stat.value}</dd>
                <dt className="text-xs leading-5 text-gray-400 mt-2">{stat.description}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Stats;
