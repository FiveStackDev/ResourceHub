import React, { useState, useEffect } from 'react';
import AssetTable from '../../../components/Asset/OrganizationAssets/AssetTable';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { UserPlus, Search } from 'lucide-react';
import EditAssetPopup from '../../../components/Asset/OrganizationAssets/AssetEdit';
import DeleteAssetPopup from '../../../components/Asset/OrganizationAssets/AssetDelete';
import AssetAdd from '../../../components/Asset/OrganizationAssets/AssetAdd';
import axios from 'axios';
import '../../css/AssetAdmin.css';
import AdminLayout from '../../../layouts/Admin/AdminLayout';
import { BASE_URLS } from '../../../services/api/config';

function AssetAdmin() {
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addAssetOpen, setAddAssetOpen] = useState(false);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = () => {
    fetch(`${BASE_URLS.asset}/details`)
      .then((response) => response.json())
      .then((data) => setAssets(data))
      .catch((error) => console.error('Error fetching assets:', error));
  };

  const uniqueCategories = [
    'All',
    ...new Set(assets.map((asset) => asset.category)),
  ];

  const filteredAssets = assets.filter(
    (asset) =>
      (filterCategory === 'All' || asset.category === filterCategory) &&
      asset.asset_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleEditOpen = (asset) => {
    setSelectedAsset(asset);
    setEditOpen(true);
  };

  const handleDeleteOpen = (asset) => {
    setSelectedAsset(asset);
    setDeleteOpen(true);
  };

  // ✅ Updated: Re-fetch after edit
  const handleUpdateAsset = () => {
    fetchAssets();
    setEditOpen(false);
    setSelectedAsset(null);
  };

  const handleDeleteAsset = async (id) => {
    try {
      await axios.delete(`${BASE_URLS.asset}/details/${id}`);
      setAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
      setDeleteOpen(false);
      setSelectedAsset(null);
    } catch (error) {
      console.error('Error deleting asset:', error);
      alert('Failed to delete asset');
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Assets</h1>
        </div>

        <div className="search-filter-section">
          <div className="search-filter-container">
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{ startAdornment: <Search size={20} /> }}
              className="search-bar"
            />
            <FormControl
              variant="outlined"
              size="small"
              className="category-dropdown"
            >
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                label="Filter by Category"
              >
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button
            variant="contained"
            color="primary"
            startIcon={<UserPlus size={20} />}
            className="add-asset-btn"
            onClick={() => setAddAssetOpen(true)}
          >
            Add New Asset
          </Button>
        </div>

        <div className="table-container">
          <AssetTable
            assets={filteredAssets}
            handleEditOpen={handleEditOpen}
            handleDeleteOpen={handleDeleteOpen}
          />
        </div>

        {selectedAsset && (
          <>
            <EditAssetPopup
              open={editOpen}
              asset={selectedAsset}
              onClose={() => setEditOpen(false)}
              onUpdate={handleUpdateAsset} // ✅ Re-fetch after edit
            />
            <DeleteAssetPopup
              open={deleteOpen}
              asset={selectedAsset}
              onClose={() => setDeleteOpen(false)}
              onDelete={handleDeleteAsset}
            />
          </>
        )}

        <AssetAdd
          open={addAssetOpen}
          onClose={() => setAddAssetOpen(false)}
          onAdd={fetchAssets} // Refresh asset list after addition
        />
      </div>
    </AdminLayout>
  );
}

export default AssetAdmin;
