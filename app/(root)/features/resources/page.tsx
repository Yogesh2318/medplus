'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Add from '@/components/shared/Add';

interface Item {
  itemName: string;
  quantity: number;
}

export default function Resource() {
  const [list, setList] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddItem = (item: Item) => {
    setList((prevList) => [...prevList, item]);
    setIsAddDialogOpen(false);
  };

  const handleDeleteItem = (itemName: string) => {
    setList((prevList) => prevList.filter(item => item.itemName !== itemName));
  };

  const handleIncrement = (itemName: string) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.itemName === itemName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemName: string) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.itemName === itemName && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search items"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-100 transition">
          Search
        </Button>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
            Add Item
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-50 p-6 rounded-md shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Add New Item</DialogTitle>
          </DialogHeader>
          <Add onAdd={handleAddItem} />
        </DialogContent>
      </Dialog>

      <ul className="mt-6 space-y-2">
        {list
          .filter((item) =>
            item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 rounded-md flex justify-between items-center shadow-sm"
            >
              <div className="text-gray-700 flex items-center gap-4">
                <span>
                  {item.itemName} - Quantity: {item.quantity}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecrement(item.itemName)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    disabled={item.quantity === 0}
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncrement(item.itemName)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleDeleteItem(item.itemName)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
