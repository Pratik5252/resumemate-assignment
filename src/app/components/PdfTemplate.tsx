'use client';
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

type PdfTemplateProps = {
    formData: Record<string, string>;
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 40,
        fontSize: 12,
    },
    container: {
        width: '70%',
        border: '1pt solid #ccc',
        padding: 20,
        marginTop: 50,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
        width: '100%',
    },
    label: {
        width: 150,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 12,
        paddingRight: 16,
    },
    value: {
        flex: 1,
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1.4,
    },
});

const PdfTemplate: React.FC<PdfTemplateProps> = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>
                {Object.entries(formData).map(([key, value]) => (
                    <View key={key} style={styles.row}>
                        <Text style={styles.label}>
                            {key.replace(/([A-Z])/g, ' $1')}:
                        </Text>
                        <Text style={styles.value}>{value ? value : '-'}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default PdfTemplate;
