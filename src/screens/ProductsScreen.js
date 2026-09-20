import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { getErrorMessage } from '../api/apiClient';
import { getProducts } from '../api/productApi';
import Button from '../components/Button';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import { COLORS, SHADOW } from '../constants/theme';

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  const hasMorePages = page < totalPages;

  const fetchPage = useCallback(async (nextPage, { replace = false } = {}) => {
    const response = await getProducts(nextPage);
    const list = response.data.data || [];
    const pages = response.data.total_pages || 1;
    const total = response.data.total || list.length;

    setTotalPages(pages);
    setTotalItems(total);
    setPage(nextPage);
    setProducts((current) => (replace ? list : [...current, ...list]));
  }, []);

  const loadInitial = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      await fetchPage(1, { replace: true });
    } catch (err) {
      setProducts([]);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [fetchPage]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  async function handleRefresh() {
    setRefreshing(true);
    setError('');

    try {
      await fetchPage(1, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setRefreshing(false);
    }
  }

  async function handleLoadMore() {
    if (loadingMore || loading || refreshing || !hasMorePages) {
      return;
    }

    setLoadingMore(true);
    setError('');

    try {
      await fetchPage(page + 1);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) {
    return <Loader fullScreen label="Loading products" />;
  }

  if (error && products.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <View style={styles.errorIcon}>
            <Ionicons name="alert-circle" size={32} color={COLORS.danger} />
          </View>
          <Text style={styles.errorTitle}>Could not load products</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Retry" onPress={loadInitial} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.topSafe} edges={['top']}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.columns}
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
              <ProductCard product={item} />
            </View>
          )}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={COLORS.primary}
            />
          }
          ListHeaderComponent={
            <View>
              <View style={styles.hero}>
                <View style={styles.blobOne} />
                <View style={styles.blobTwo} />
                <Text style={styles.heroLabel}>Catalog</Text>
                <Text style={styles.heroTitle}>Color products</Text>
                <Text style={styles.heroCopy}>
                  Pull to refresh. Tap Load more to fetch the next page.
                </Text>
              </View>

              <View style={styles.statsRow}>
                <View style={[styles.statCard, SHADOW]}>
                  <Text style={styles.statValue}>
                    {page}/{totalPages}
                  </Text>
                  <Text style={styles.statLabel}>Page</Text>
                </View>
                <View style={[styles.statCard, SHADOW]}>
                  <Text style={styles.statValue}>{products.length}</Text>
                  <Text style={styles.statLabel}>Loaded</Text>
                </View>
                <View style={[styles.statCard, SHADOW]}>
                  <Text style={styles.statValue}>{totalItems}</Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.errorTitle}>No products found</Text>
              <Text style={styles.errorText}>Pull to refresh and try again.</Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              {error ? <Text style={styles.footerError}>{error}</Text> : null}

              {hasMorePages ? (
                <Button
                  title={
                    loadingMore ? 'Loading page ' + (page + 1) : 'Load more'
                  }
                  onPress={handleLoadMore}
                  loading={loadingMore}
                />
              ) : products.length > 0 ? (
                <View style={styles.donePill}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={COLORS.success}
                  />
                  <Text style={styles.endNote}>
                    All {totalItems} products loaded
                  </Text>
                </View>
              ) : null}
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topSafe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingBottom: 28,
    flexGrow: 1,
  },
  hero: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  blobOne: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.12)',
    top: -40,
    right: -24,
  },
  blobTwo: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,122,89,0.35)',
    bottom: 16,
    left: -16,
  },
  heroLabel: {
    color: '#DDD8FF',
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  heroTitle: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  heroCopy: {
    marginTop: 8,
    color: '#E4E0FF',
    lineHeight: 20,
    maxWidth: 280,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: -16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  statLabel: {
    marginTop: 2,
    color: COLORS.muted,
    fontWeight: '700',
    fontSize: 11,
  },
  columns: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },
  cardWrap: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  errorIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  errorText: {
    color: COLORS.muted,
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  footerError: {
    color: COLORS.danger,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  donePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 16,
  },
  endNote: {
    color: COLORS.muted,
    fontWeight: '700',
  },
});
