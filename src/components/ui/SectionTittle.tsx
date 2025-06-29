import React from 'react';

const SectionTittle = ({ tittle }: { tittle: string }) => {
    return (
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 mt-3 uppercase tracking-wide">
            {tittle}
        </h2>)
};

export default SectionTittle;