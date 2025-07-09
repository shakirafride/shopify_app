import React, { useEffect, useState } from "react";
import {
  AppProvider,
  Page,
  IndexTable,
  LegacyCard,
  Text,
  useIndexResourceState,
  Badge,
  Button,
  Stack,
  Spinner,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

const Getproduct = async () => {
  try {
    const resp = await fetch("/api/GetProduct/Getproduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    console.log("Fetched data:", data);

    if (data.success && data.products && Array.isArray(data.products.data)) {
      setProducts(
        data.products.data.map((item) => ({
          id: item.id,
          name: item.title || "No Title",
          price:
            item.variants && item.variants[0]
              ? `$${item.variants[0].price}`
              : "$0",
          status: item.status || "Active",
        }))
      );
    } else {
      setProducts([]);
    }
  } catch (error) {
    console.log("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    Getproduct();
  }, []);

  const handleDelete = (id) => {
    const updated = products.filter((product) => product.id !== id);
    setProducts(updated);
  };

  const handleUpdate = (id) => {
    alert(`Update button clicked for product id: ${id}`);
  };

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  return (
    <AppProvider>
      <Page title="Products Table">
        <LegacyCard>
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <Spinner accessibilityLabel="Loading products" size="large" />
            </div>
          ) : (
            <IndexTable
              resourceName={resourceName}
              itemCount={products.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: "Title" },
                { title: "Price" },
                { title: "Status" },
                { title: "Actions" },
              ]}
            >
              {products.map(({ id, name, price, status }, index) => (
                <IndexTable.Row
                  id={id}
                  key={id}
                  selected={selectedResources.includes(id)}
                  position={index}
                >
                  <IndexTable.Cell>
                    <Text fontWeight="medium">{name}</Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>{price}</IndexTable.Cell>
                  <IndexTable.Cell>
                    <Badge
                      status={
                        status === "Active"
                          ? "success"
                          : status === "Draft"
                          ? "attention"
                          : "default"
                      }
                    >
                      {status}
                    </Badge>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Stack spacing="tight">
                      <Button size="slim" onClick={() => handleUpdate(id)}>
                        Update
                      </Button>
                      <Button
                        size="slim"
                        tone="critical"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
          )}
        </LegacyCard>
      </Page>
    </AppProvider>
  );
}
