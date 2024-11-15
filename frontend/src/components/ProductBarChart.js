// src/components/ProductBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductBarChart = ({ products }) => {
    const data = {
        labels: products.map(product => product.name),  // Product names
        datasets: [
            {
                label: 'Product Quantity',
                data: products.map(product => product.quantity), // Corresponding quantities
                backgroundColor: '#1caa1c80',  // Updated bar color
                borderColor: '#1caa1c',         // Updated bar border color
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',         // Set tick color to white
                    font: {
                        size: 16,            // Increase font size for y-axis
                    },
                },
                title: {
                    display: true,
                    text: 'Quantity',
                    color: 'white',         // Set title color to white
                    font: {
                        size: 20,            // Increase font size for y-axis title
                    },
                },
            },
            x: {
                ticks: {
                    color: 'white',         // Set tick color to white
                    font: {
                        size: 16,            // Increase font size for x-axis
                    },
                },
                title: {
                    display: true,
                    text: 'Products',
                    color: 'white',         // Set title color to white
                    font: {
                        size: 20,            // Increase font size for x-axis title
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white',         // Set legend text color to white
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default ProductBarChart;