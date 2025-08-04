
import React from 'react';

const stats = [
  { id: 1, name: 'B2B Paid Advertising', value: '40+', description: 'Average time saved per client through automation' },
  { id: 2, name: 'ROI Increase', value: '300%', description: 'Typical return on investment within 6 months' },
  { id: 3, name: 'Automation for CRM Management', value: '85%', description: 'Reduction in manual tasks across implementations' },
  { id: 4, name: 'Client Satisfaction', value: '98%', description: 'Success rate in meeting project objectives' },
];

const Stats = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Proven Results Through Automation
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 px-4">
              Our AI-powered solutions deliver measurable impact across every implementation.
            </p>
          </div>
          <dl className="mt-12 sm:mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-900 p-6 sm:p-8">
                <dt className="text-xs sm:text-sm font-semibold leading-5 sm:leading-6 text-gray-300">{stat.name}</dt>
                <dd className="order-first text-3xl sm:text-4xl font-bold tracking-tight text-white">{stat.value}</dd>
                <dt className="text-xs leading-4 sm:leading-5 text-gray-400 mt-1 sm:mt-2">{stat.description}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Stats;
